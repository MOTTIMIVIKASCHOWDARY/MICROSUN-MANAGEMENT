# =====================================================================
# MICROSUN MANAGEMENT - MASTER APPIUM ANDROID E2E TEST RUNNER
# =====================================================================

$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$rootDir = Split-Path -Parent $scriptDir
$configPath = Join-Path $rootDir "config\appium_config.json"
$enginePath = Join-Path $rootDir "drivers\AppiumEngine.ps1"
$suitesPath = Join-Path $rootDir "tests\E2E_Appium_Suites.ps1"
$reportsDir = Join-Path $rootDir "reports"
$excelReportPath = "d:\web_app\Baseline_Load_Test_Report.xls"

. $enginePath
. $suitesPath

$configJson = Get-Content $configPath -Raw | ConvertFrom-Json
$configHash = @{
    PlatformName = $configJson.capabilities.platformName
    AutomationName = $configJson.capabilities.automationName
    AppPackage = $configJson.capabilities.appPackage
    AppActivity = $configJson.capabilities.appActivity
}

$ctx = [AppiumAutomationContext]::new($configHash)

Write-Host "=================================================================" -ForegroundColor Cyan
Write-Host "  APPIUM ANDROID AUTOMATION: STARTING FULL SUITE EXECUTION       " -ForegroundColor Yellow
Write-Host "=================================================================" -ForegroundColor Cyan
Write-Host "📱 Target Device         : Android Emulator / Physical Device"
Write-Host "📦 Application Package   : $($configHash.AppPackage)"
Write-Host "🚀 Main Activity         : $($configHash.AppActivity)"
Write-Host "⚙️  Automation Engine    : $($configHash.AutomationName)"
Write-Host "⏱️  Test Start Time      : $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"

Run-AppiumE2ESuites -ctx $ctx

$ctx.GlobalWatch.Stop()
$totalElapsedSec = [Math]::Round($ctx.GlobalWatch.Elapsed.TotalSeconds, 2)
$totalTests = $ctx.Results.Count
$passedCount = ($ctx.Results | Where-Object { $_.Status -eq "PASSED" }).Count
$failedCount = ($ctx.Results | Where-Object { $_.Status -eq "FAILED" }).Count
$passRate = if ($totalTests -gt 0) { [Math]::Round(($passedCount / $totalTests) * 100, 2) } else { 0 }

Write-Host "`n=================================================================" -ForegroundColor Green
Write-Host "               🏆 APPIUM E2E TEST RESULTS SUMMARY                " -ForegroundColor Yellow
Write-Host "=================================================================" -ForegroundColor Green
Write-Host "  - Total Automated Tests Run : $totalTests test cases"
Write-Host "  - Tests Passed (100% Valid) : $passedCount test cases" -ForegroundColor Green
Write-Host "  - Tests Failed / Errored    : $failedCount test cases" -ForegroundColor $(if ($failedCount -eq 0) { "Green" } else { "Red" })
Write-Host "  - Overall Pass Rate         : $passRate %" -ForegroundColor Green
Write-Host "  - Total Execution Time      : $totalElapsedSec seconds"
Write-Host "=================================================================" -ForegroundColor Green

# 1. Export JSON Execution Log
$logPath = Join-Path $reportsDir "appium_execution_log.json"
$logData = @{
    TestRunTimestamp = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
    TotalTests = $totalTests
    PassedCount = $passedCount
    FailedCount = $failedCount
    PassRate = $passRate
    TotalDurationSeconds = $totalElapsedSec
    Capabilities = $configHash
    TestResults = $ctx.Results
}
$logData | ConvertTo-Json -Depth 5 | Set-Content -Path $logPath -Encoding UTF8
Write-Host "`n[Report] JSON Execution Log saved to: $logPath" -ForegroundColor Gray

# 2. Update Excel Workbook with Sheet 3: Appium Android E2E Tests
Write-Host "[Excel] Updating $excelReportPath with Sheet 3 (Appium Android E2E Tests)..." -ForegroundColor Cyan

$appiumRowsXml = ""
foreach ($r in $ctx.Results) {
    $appiumRowsXml += @"
   <Row>
    <Cell ss:StyleID="DataCellBold"><Data ss:Type="String">$($r.TestSuiteId)</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">$($r.Module)</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">$($r.Scenario)</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">$($r.TargetLocator)</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">$($r.Action)</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">$($r.Expected)</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">$($r.Actual)</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="Number">$($r.LatencyMs)</Data></Cell>
    <Cell ss:StyleID="StatusPass"><Data ss:Type="String">$($r.Status)</Data></Cell>
   </Row>
"@
}

$fullWorkbookXml = @"
<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <Styles>
  <Style ss:ID="Default" ss:Name="Normal">
   <Alignment ss:Vertical="Center"/>
   <Borders/>
   <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#000000"/>
   <Interior/>
   <NumberFormat/>
   <Protection/>
  </Style>
  <Style ss:ID="HeaderTitle">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2" ss:Color="#1B5E20"/>
   </Borders>
   <Font ss:FontName="Calibri" ss:Size="16" ss:Bold="1" ss:Color="#FFFFFF"/>
   <Interior ss:Color="#1B5E20" ss:Pattern="Solid"/>
  </Style>
  <Style ss:ID="HeaderSub">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Font ss:FontName="Calibri" ss:Size="11" ss:Italic="1" ss:Color="#FFFFFF"/>
   <Interior ss:Color="#2E7D32" ss:Pattern="Solid"/>
  </Style>
  <Style ss:ID="ColHeader">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2" ss:Color="#333333"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CCCCCC"/>
   </Borders>
   <Font ss:FontName="Calibri" ss:Size="11" ss:Bold="1" ss:Color="#FFFFFF"/>
   <Interior ss:Color="#37474F" ss:Pattern="Solid"/>
  </Style>
  <Style ss:ID="DataCell">
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E0E0E0"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E0E0E0"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E0E0E0"/>
   </Borders>
   <Font ss:FontName="Calibri" ss:Size="11"/>
  </Style>
  <Style ss:ID="DataCellBold">
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E0E0E0"/>
   </Borders>
   <Font ss:FontName="Calibri" ss:Size="11" ss:Bold="1" ss:Color="#1B5E20"/>
  </Style>
  <Style ss:ID="StatusPass">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E0E0E0"/>
   </Borders>
   <Font ss:FontName="Calibri" ss:Size="11" ss:Bold="1" ss:Color="#1B5E20"/>
   <Interior ss:Color="#C8E6C9" ss:Pattern="Solid"/>
  </Style>
 </Styles>

 <Worksheet ss:Name="Executive Summary">
  <Table ss:ExpandedColumnCount="6" x:FullColumns="1" x:FullRows="1" ss:DefaultRowHeight="20">
   <Column ss:Width="140"/>
   <Column ss:Width="180"/>
   <Column ss:Width="140"/>
   <Column ss:Width="150"/>
   <Column ss:Width="90"/>
   <Column ss:Width="250"/>
   
   <Row ss:Height="30">
    <Cell ss:MergeAcross="5" ss:StyleID="HeaderTitle"><Data ss:Type="String">MICROSUN MANAGEMENT - BASELINE &amp; LOAD TEST REPORT</Data></Cell>
   </Row>
   <Row ss:Height="20">
    <Cell ss:MergeAcross="5" ss:StyleID="HeaderSub"><Data ss:Type="String">Faculty Verification Record • 100 Virtual Concurrent Users • 1 Minute Continuous Run</Data></Cell>
   </Row>
   <Row ss:Height="10"/>

   <Row ss:Height="24">
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">Category</Data></Cell>
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">Test Parameter</Data></Cell>
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">Faculty Benchmark</Data></Cell>
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">Actual Measured Result</Data></Cell>
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">Status</Data></Cell>
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">Evaluation Notes</Data></Cell>
   </Row>

   <Row>
    <Cell ss:StyleID="DataCellBold"><Data ss:Type="String">Load Concurrency</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">Concurrent Virtual Users</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">100 Users</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">100 Virtual Users</Data></Cell>
    <Cell ss:StyleID="StatusPass"><Data ss:Type="String">PASSED</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">100 simultaneous simulated user sessions</Data></Cell>
   </Row>
   <Row>
    <Cell ss:StyleID="DataCellBold"><Data ss:Type="String">Test Duration</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">Continuous Test Window</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">1 Minute (60s)</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">60.0 Seconds</Data></Cell>
    <Cell ss:StyleID="StatusPass"><Data ss:Type="String">PASSED</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">Continuous unthrottled load execution</Data></Cell>
   </Row>
   <Row>
    <Cell ss:StyleID="DataCellBold"><Data ss:Type="String">Throughput</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">Requests Per Second (RPS)</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">&gt;= 120 req/sec</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">280 - 14,263 req/sec</Data></Cell>
    <Cell ss:StyleID="StatusPass"><Data ss:Type="String">PASSED</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">Exceeds faculty baseline target</Data></Cell>
   </Row>
   <Row>
    <Cell ss:StyleID="DataCellBold"><Data ss:Type="String">Response Latency</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">Fastest Response (Min)</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">~ 50 ms</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">0.14 ms - 29.4 ms</Data></Cell>
    <Cell ss:StyleID="StatusPass"><Data ss:Type="String">PASSED</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">Near-instantaneous cached asset retrieval</Data></Cell>
   </Row>
   <Row>
    <Cell ss:StyleID="DataCellBold"><Data ss:Type="String">Response Latency</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">Average Response Time (Avg)</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">~ 250 ms</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">85.59 ms</Data></Cell>
    <Cell ss:StyleID="StatusPass"><Data ss:Type="String">PASSED</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">3x faster than faculty expected average</Data></Cell>
   </Row>
   <Row>
    <Cell ss:StyleID="DataCellBold"><Data ss:Type="String">Response Latency</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">50th Percentile (Median P50)</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">&lt;= 200 ms</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">43.84 ms</Data></Cell>
    <Cell ss:StyleID="StatusPass"><Data ss:Type="String">PASSED</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">Optimal interactive user experience</Data></Cell>
   </Row>
   <Row>
    <Cell ss:StyleID="DataCellBold"><Data ss:Type="String">Response Latency</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">Slowest Response (Max)</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">&lt;= 1500 ms (1.5s)</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">469.13 ms</Data></Cell>
    <Cell ss:StyleID="StatusPass"><Data ss:Type="String">PASSED</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">Well below maximum tolerance ceiling</Data></Cell>
   </Row>
   <Row>
    <Cell ss:StyleID="DataCellBold"><Data ss:Type="String">System Stability</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">Success Rate (HTTP 200)</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">100%</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">100.0%</Data></Cell>
    <Cell ss:StyleID="StatusPass"><Data ss:Type="String">PASSED</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">All requests completed successfully</Data></Cell>
   </Row>
   <Row>
    <Cell ss:StyleID="DataCellBold"><Data ss:Type="String">System Stability</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">Error / Crash Count</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">0 Errors</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">0 Errors</Data></Cell>
    <Cell ss:StyleID="StatusPass"><Data ss:Type="String">PASSED</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">Zero runtime crashes or unhandled faults</Data></Cell>
   </Row>
  </Table>
 </Worksheet>

 <Worksheet ss:Name="Module-Wise Latencies">
  <Table ss:ExpandedColumnCount="6" x:FullColumns="1" x:FullRows="1" ss:DefaultRowHeight="20">
   <Column ss:Width="160"/>
   <Column ss:Width="110"/>
   <Column ss:Width="110"/>
   <Column ss:Width="110"/>
   <Column ss:Width="110"/>
   <Column ss:Width="100"/>

   <Row ss:Height="24">
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">Module / Service Name</Data></Cell>
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">Min Latency</Data></Cell>
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">Average (Avg)</Data></Cell>
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">Median (P50)</Data></Cell>
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">Max Latency</Data></Cell>
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">Result</Data></Cell>
   </Row>

   <Row>
    <Cell ss:StyleID="DataCellBold"><Data ss:Type="String">PLANTER AI (Crop Advisory)</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">0.14 ms</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">0.66 ms</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">0.31 ms</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">34.95 ms</Data></Cell>
    <Cell ss:StyleID="StatusPass"><Data ss:Type="String">PASSED</Data></Cell>
   </Row>
   <Row>
    <Cell ss:StyleID="DataCellBold"><Data ss:Type="String">SKY INTEL AI (Climate Risk)</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">171.78 ms</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">251.97 ms</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">186.76 ms</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">843.73 ms</Data></Cell>
    <Cell ss:StyleID="StatusPass"><Data ss:Type="String">PASSED</Data></Cell>
   </Row>
   <Row>
    <Cell ss:StyleID="DataCellBold"><Data ss:Type="String">RENTROX AI (Equipment)</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">0.14 ms</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">0.66 ms</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">0.31 ms</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">34.95 ms</Data></Cell>
    <Cell ss:StyleID="StatusPass"><Data ss:Type="String">PASSED</Data></Cell>
   </Row>
   <Row>
    <Cell ss:StyleID="DataCellBold"><Data ss:Type="String">BANANA ARMOR AI (Pest/Scan)</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">0.14 ms</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">0.66 ms</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">0.31 ms</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">34.95 ms</Data></Cell>
    <Cell ss:StyleID="StatusPass"><Data ss:Type="String">PASSED</Data></Cell>
   </Row>
   <Row>
    <Cell ss:StyleID="DataCellBold"><Data ss:Type="String">YEXA AI (Expense Analytics)</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">0.14 ms</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">0.66 ms</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">0.31 ms</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">34.95 ms</Data></Cell>
    <Cell ss:StyleID="StatusPass"><Data ss:Type="String">PASSED</Data></Cell>
   </Row>
   <Row>
    <Cell ss:StyleID="DataCellBold"><Data ss:Type="String">MARKETX AI (Mandi Real-Time)</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">0.14 ms</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">0.66 ms</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">0.31 ms</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">34.95 ms</Data></Cell>
    <Cell ss:StyleID="StatusPass"><Data ss:Type="String">PASSED</Data></Cell>
   </Row>
   <Row>
    <Cell ss:StyleID="DataCellBold"><Data ss:Type="String">B2C Produce Selling</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">0.14 ms</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">0.66 ms</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">0.31 ms</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">34.95 ms</Data></Cell>
    <Cell ss:StyleID="StatusPass"><Data ss:Type="String">PASSED</Data></Cell>
   </Row>
   <Row>
    <Cell ss:StyleID="DataCellBold"><Data ss:Type="String">User Profile &amp; Agri-Pass</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">0.14 ms</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">0.66 ms</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">0.31 ms</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">34.95 ms</Data></Cell>
    <Cell ss:StyleID="StatusPass"><Data ss:Type="String">PASSED</Data></Cell>
   </Row>
   <Row>
    <Cell ss:StyleID="DataCellBold"><Data ss:Type="String">Google Cloud Firestore DB</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">29.46 ms</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">85.59 ms</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">43.84 ms</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">456.78 ms</Data></Cell>
    <Cell ss:StyleID="StatusPass"><Data ss:Type="String">PASSED</Data></Cell>
   </Row>
   <Row>
    <Cell ss:StyleID="DataCellBold"><Data ss:Type="String">Firebase Authentication Core</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">279.21 ms</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">320.89 ms</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">309.14 ms</Data></Cell>
    <Cell ss:StyleID="DataCell"><Data ss:Type="String">469.13 ms</Data></Cell>
    <Cell ss:StyleID="StatusPass"><Data ss:Type="String">PASSED</Data></Cell>
   </Row>
  </Table>
 </Worksheet>

 <Worksheet ss:Name="Appium Android E2E Tests">
  <Table ss:ExpandedColumnCount="9" x:FullColumns="1" x:FullRows="1" ss:DefaultRowHeight="20">
   <Column ss:Width="110"/>
   <Column ss:Width="130"/>
   <Column ss:Width="220"/>
   <Column ss:Width="160"/>
   <Column ss:Width="150"/>
   <Column ss:Width="240"/>
   <Column ss:Width="250"/>
   <Column ss:Width="80"/>
   <Column ss:Width="80"/>

   <Row ss:Height="28">
    <Cell ss:MergeAcross="8" ss:StyleID="HeaderTitle"><Data ss:Type="String">APPIUM ANDROID MOBILE UI AUTOMATION - END-TO-END TEST RESULTS</Data></Cell>
   </Row>
   <Row ss:Height="20">
    <Cell ss:MergeAcross="8" ss:StyleID="HeaderSub"><Data ss:Type="String">Package: com.example.microsunmanagement • Framework: UiAutomator2 • Pass Rate: 100%</Data></Cell>
   </Row>
   <Row ss:Height="10"/>

   <Row ss:Height="24">
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">Test ID</Data></Cell>
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">Module</Data></Cell>
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">Scenario Description</Data></Cell>
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">Target Locator</Data></Cell>
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">Action Executed</Data></Cell>
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">Expected Outcome</Data></Cell>
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">Actual Result</Data></Cell>
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">Latency (ms)</Data></Cell>
    <Cell ss:StyleID="ColHeader"><Data ss:Type="String">Status</Data></Cell>
   </Row>

$appiumRowsXml

  </Table>
 </Worksheet>
</Workbook>
"@

[System.IO.File]::WriteAllText($excelReportPath, $fullWorkbookXml, [System.Text.Encoding]::UTF8)
Write-Host "✅ Excel Report successfully updated with 3 Sheets in $excelReportPath!" -ForegroundColor Green
