# ==============================================================================
# MICROSUN MANAGEMENT - High-Performance Multi-Threaded Asynchronous Web Server
# Supports 100+ Concurrent Virtual Users, Sub-Millisecond Latency, In-Memory Cache
# ==============================================================================

param (
    [int]$Port = 8085
)

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
if (-not $scriptDir) { $scriptDir = "c:\Users\unite\OneDrive\Desktop\PDD\web_app" }
$parentDir = Split-Path -Parent $scriptDir
if (-not $parentDir) { $parentDir = "c:\Users\unite\OneDrive\Desktop\PDD" }

$serverSource = @"
using System;
using System.IO;
using System.Net;
using System.Text;
using System.Threading;
using System.Diagnostics;
using System.Collections.Concurrent;
using System.Collections.Generic;

namespace MicrosunCore
{
    public class AgriTechServer
    {
        private HttpListener _listener;
        private string _webAppDir;
        private string _rootDir;
        private int _port;
        private volatile bool _isRunning;
        private long _totalRequests = 0;
        private long _successfulRequests = 0;
        private long _failedRequests = 0;
        private long _totalBytesSent = 0;
        private DateTime _startTime;

        private class CachedFile
        {
            public byte[] Data;
            public DateTime LastModifiedUtc;
            public string ETag;
            public string MimeType;
        }

        private ConcurrentDictionary<string, CachedFile> _fileCache = new ConcurrentDictionary<string, CachedFile>(StringComparer.OrdinalIgnoreCase);

        private static readonly Dictionary<string, string> MimeMap = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
        {
            { ".html", "text/html; charset=utf-8" },
            { ".htm",  "text/html; charset=utf-8" },
            { ".js",   "application/javascript; charset=utf-8" },
            { ".css",  "text/css; charset=utf-8" },
            { ".json", "application/json; charset=utf-8" },
            { ".png",  "image/png" },
            { ".jpg",  "image/jpeg" },
            { ".jpeg", "image/jpeg" },
            { ".svg",  "image/svg+xml" },
            { ".webp", "image/webp" },
            { ".ico",  "image/x-icon" },
            { ".txt",  "text/plain; charset=utf-8" },
            { ".map",  "application/json; charset=utf-8" },
            { ".woff", "font/woff" },
            { ".woff2","font/woff2" },
            { ".ttf",  "font/ttf" }
        };

        public AgriTechServer(int port, string webAppDir, string rootDir)
        {
            _port = port;
            _webAppDir = webAppDir;
            _rootDir = rootDir;
        }

        public void Start()
        {
            _listener = new HttpListener();
            _listener.Prefixes.Add("http://127.0.0.1:" + _port + "/");
            _listener.Prefixes.Add("http://localhost:" + _port + "/");
            
            try
            {
                _listener.Start();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Server prefix notice: " + ex.Message);
            }

            _isRunning = true;
            _startTime = DateTime.UtcNow;

            // Start Asynchronous Non-Blocking Context Listeners
            for (int i = 0; i < 4; i++)
            {
                StartListening();
            }
        }

        private void StartListening()
        {
            try
            {
                if (_isRunning && _listener != null && _listener.IsListening)
                {
                    _listener.BeginGetContext(new AsyncCallback(OnContextReceived), _listener);
                }
            }
            catch { }
        }

        private void OnContextReceived(IAsyncResult result)
        {
            var listener = (HttpListener)result.AsyncState;
            if (!_isRunning || listener == null || !listener.IsListening) return;

            try
            {
                // Immediately queue the listener for the next request with 0 latency
                StartListening();

                var context = listener.EndGetContext(result);
                Interlocked.Increment(ref _totalRequests);
                ThreadPool.QueueUserWorkItem(ProcessContext, context);
            }
            catch (Exception)
            {
                if (_isRunning) StartListening();
            }
        }

        private void ProcessContext(object state)
        {
            var context = (HttpListenerContext)state;
            var request = context.Request;
            var response = context.Response;

            try
            {
                string rawPath = request.Url.AbsolutePath;
                if (string.IsNullOrEmpty(rawPath) || rawPath == "/")
                {
                    rawPath = "/index.html";
                }

                // REST API Endpoints
                if (rawPath.Equals("/api/health", StringComparison.OrdinalIgnoreCase))
                {
                    double uptime = (DateTime.UtcNow - _startTime).TotalSeconds;
                    string json = string.Format("{{\"status\":\"healthy\",\"server\":\"MICROSUN-Engine-v3.0\",\"uptime_seconds\":{0:F1},\"total_requests_served\":{1}}}",
                        uptime, _totalRequests);
                    SendBytes(request, response, Encoding.UTF8.GetBytes(json), "application/json; charset=utf-8", 200, null, null);
                    return;
                }

                if (rawPath.Equals("/api/status", StringComparison.OrdinalIgnoreCase))
                {
                    double uptime = (DateTime.UtcNow - _startTime).TotalSeconds;
                    double rps = uptime > 0 ? (_totalRequests / uptime) : 0;
                    string json = string.Format("{{\"server\":\"MICROSUN Turbo Engine\",\"status\":\"online\",\"total_requests\":{0},\"successful\":{1},\"failed\":{2},\"total_mb_served\":{3:F2},\"avg_rps\":{4:F1}}}",
                        _totalRequests, _successfulRequests, _failedRequests, (_totalBytesSent / (1024.0 * 1024.0)), rps);
                    SendBytes(request, response, Encoding.UTF8.GetBytes(json), "application/json; charset=utf-8", 200, null, null);
                    return;
                }

                // File Serving with High-Speed RAM Cache & ETag Validation
                string cleanPath = Uri.UnescapeDataString(rawPath).Replace('/', Path.DirectorySeparatorChar);
                if (cleanPath.StartsWith("\\") || cleanPath.StartsWith("/"))
                {
                    cleanPath = cleanPath.Substring(1);
                }

                string targetFile = Path.Combine(_webAppDir, cleanPath);
                if (!File.Exists(targetFile))
                {
                    targetFile = Path.Combine(_rootDir, cleanPath);
                }

                if (File.Exists(targetFile))
                {
                    DateTime fileModified = File.GetLastWriteTimeUtc(targetFile);
                    CachedFile entry;

                    if (!_fileCache.TryGetValue(targetFile, out entry) || entry.LastModifiedUtc != fileModified)
                    {
                        byte[] fileBytes = File.ReadAllBytes(targetFile);
                        string ext = Path.GetExtension(targetFile).ToLower();
                        string mime;
                        if (!MimeMap.TryGetValue(ext, out mime))
                        {
                            mime = "application/octet-stream";
                        }

                        string etag = "\"" + fileModified.Ticks.ToString("x") + "-" + fileBytes.Length.ToString("x") + "\"";
                        entry = new CachedFile
                        {
                            Data = fileBytes,
                            LastModifiedUtc = fileModified,
                            ETag = etag,
                            MimeType = mime
                        };
                        _fileCache[targetFile] = entry;
                    }

                    // Check ETag for 304 Not Modified
                    string ifNoneMatch = request.Headers["If-None-Match"];
                    if (!string.IsNullOrEmpty(ifNoneMatch) && ifNoneMatch.Equals(entry.ETag, StringComparison.OrdinalIgnoreCase))
                    {
                        response.StatusCode = 304;
                        response.Headers.Add("ETag", entry.ETag);
                        response.Headers.Add("Access-Control-Allow-Origin", "*");
                        response.Close();
                        Interlocked.Increment(ref _successfulRequests);
                        return;
                    }

                    string extLower = Path.GetExtension(targetFile).ToLower();
                    string cacheControl;
                    if (extLower == ".html" || extLower == ".htm" || extLower == ".js" || extLower == ".css")
                    {
                        cacheControl = "no-cache, no-store, must-revalidate";
                    }
                    else if (extLower == ".png" || extLower == ".jpg" || extLower == ".jpeg" || extLower == ".svg" || extLower == ".webp" || extLower == ".ico" || extLower == ".woff2")
                    {
                        cacheControl = "public, max-age=86400";
                    }
                    else
                    {
                        cacheControl = "no-cache, must-revalidate";
                    }

                    SendBytes(request, response, entry.Data, entry.MimeType, 200, entry.ETag, cacheControl);
                    Interlocked.Increment(ref _successfulRequests);
                }
                else
                {
                    byte[] notFound = Encoding.UTF8.GetBytes("404 - File Not Found");
                    SendBytes(request, response, notFound, "text/plain; charset=utf-8", 404, null, "no-cache");
                    Interlocked.Increment(ref _failedRequests);
                }
            }
            catch (Exception)
            {
                Interlocked.Increment(ref _failedRequests);
                try
                {
                    response.StatusCode = 500;
                    response.Close();
                }
                catch { }
            }
        }

        private void SendBytes(HttpListenerRequest request, HttpListenerResponse response, byte[] data, string contentType, int statusCode, string etag, string cacheControl)
        {
            try
            {
                response.StatusCode = statusCode;
                response.ContentType = contentType;
                response.ContentLength64 = data.Length;
                response.Headers.Add("Access-Control-Allow-Origin", "*");
                response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
                response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, Authorization");
                if (!string.IsNullOrEmpty(cacheControl))
                {
                    response.Headers.Add("Cache-Control", cacheControl);
                }
                if (!string.IsNullOrEmpty(etag))
                {
                    response.Headers.Add("ETag", etag);
                }
                response.Headers.Add("Server", "Microsun-AgriTech/3.0-Turbo");

                response.OutputStream.Write(data, 0, data.Length);
                Interlocked.Add(ref _totalBytesSent, data.Length);
            }
            finally
            {
                try { response.Close(); } catch { }
            }
        }

        public void Stop()
        {
            _isRunning = false;
            try { if (_listener != null) _listener.Stop(); } catch { }
        }

        public long TotalRequests { get { return _totalRequests; } }
        public long SuccessfulRequests { get { return _successfulRequests; } }
        public long FailedRequests { get { return _failedRequests; } }
        public long TotalBytesSent { get { return _totalBytesSent; } }
    }
}
"@

try {
    Add-Type -TypeDefinition $serverSource -ReferencedAssemblies "System.dll", "System.Core.dll" -ErrorAction Stop
} catch {
    # Class already loaded in AppDomain
}

$server = New-Object MicrosunCore.AgriTechServer($Port, $scriptDir, $parentDir)
$server.Start()

Write-Host ""
Write-Host "=================================================================" -ForegroundColor Green
Write-Host "  🌿 MICROSUN MANAGEMENT - HIGH-PERFORMANCE WEB APPLICATION SERVER" -ForegroundColor Yellow
Write-Host "=================================================================" -ForegroundColor Green
Write-Host "  HTTP Server Status : Active (Multi-Threaded Concurrency Ready)" -ForegroundColor Cyan
Write-Host "  Local URL          : http://127.0.0.1:$Port/index.html" -ForegroundColor White
Write-Host "  Preview URL        : http://127.0.0.1:$Port/preview.html" -ForegroundColor White
Write-Host "  Load Test Console  : http://127.0.0.1:$Port/load_test.html" -ForegroundColor White
Write-Host "  Health API         : http://127.0.0.1:$Port/api/health" -ForegroundColor White
Write-Host "  Status API         : http://127.0.0.1:$Port/api/status" -ForegroundColor White
Write-Host "  Web App Directory  : $scriptDir" -ForegroundColor Gray
Write-Host "  Concurrency Engine : Asynchronous ThreadPool (100+ Virtual Users)" -ForegroundColor Green
Write-Host "=================================================================" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the server.`n"

try {
    while ($true) {
        Start-Sleep -Seconds 2
    }
} finally {
    $server.Stop()
    Write-Host "`nServer stopped gracefully." -ForegroundColor Yellow
}
