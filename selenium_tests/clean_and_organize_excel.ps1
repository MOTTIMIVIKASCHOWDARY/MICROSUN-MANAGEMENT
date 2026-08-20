# ==============================================================================
# MICROSUN MANAGEMENT - Clean, Streamlined Master Excel Test Report Generator
# Creates 3 Dedicated, Professional Tabs with Zero Unwanted / Placeholder Tabs
# ==============================================================================

$targetPaths = @(
    "c:\Users\unite\OneDrive\Desktop\PDD\MICROSUN_OFFICIAL_TEST_REPORT.xlsx",
    "c:\Users\unite\OneDrive\Desktop\PDD\web_app\MICROSUN_OFFICIAL_TEST_REPORT.xlsx"
)

Write-Host "Initializing Microsoft Excel COM Engine..." -ForegroundColor Cyan

$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false

$wb = $excel.Workbooks.Add()

# Ensure exactly 3 worksheets
while ($wb.Worksheets.Count -lt 3) {
    $wb.Worksheets.Add([System.Reflection.Missing]::Value, $wb.Worksheets.Item($wb.Worksheets.Count)) | Out-Null
}
while ($wb.Worksheets.Count -gt 3) {
    $wb.Worksheets.Item(4).Delete()
}

$wsSummary = $wb.Worksheets.Item(1)
$wsLoad    = $wb.Worksheets.Item(2)
$wsSel     = $wb.Worksheets.Item(3)

$wsSummary.Name = "Executive Summary & KPIs"
$wsLoad.Name    = "Baseline & Load Testing (100VU)"
$wsSel.Name     = "Selenium E2E Testing"

# Colors in BGR format for Excel COM
$ColorDarkGreen = 0x205E1B   # #1B5E20
$ColorMedGreen  = 0x327D2E   # #2E7D32
$ColorLightMint = 0xE9F5E8   # #E8F5E9
$ColorDarkSlate = 0x383226   # #263238
$ColorBorder    = 0xD0D0D0
$ColorWhite     = 0xFFFFFF
$ColorPassGreen = 0xC8E6C9   # Soft light green
$ColorTotalBg   = 0xE8F5E9

function Format-HeaderRow($ws, $row, $startCol, $endCol, $bgColor) {
    $range = $ws.Range($ws.Cells.Item($row, $startCol), $ws.Cells.Item($row, $endCol))
    $range.Interior.Color = $bgColor
    $range.Font.Bold = $true
    $range.Font.Color = $ColorWhite
    $range.Font.Size = 11
    $range.Font.Name = "Segoe UI"
    $range.HorizontalAlignment = -4108 # xlCenter
    $range.VerticalAlignment = -4108
    $range.RowHeight = 26
    $range.Borders.LineStyle = 1
    $range.Borders.Color = $ColorBorder
}

function Format-DataRange($ws, $startRow, $endRow, $startCol, $endCol) {
    $range = $ws.Range($ws.Cells.Item($startRow, $startCol), $ws.Cells.Item($endRow, $endCol))
    $range.Font.Name = "Segoe UI"
    $range.Font.Size = 10
    $range.VerticalAlignment = -4108
    $range.Borders.LineStyle = 1
    $range.Borders.Color = $ColorBorder
    $range.RowHeight = 22

    for ($r = $startRow; $r -le $endRow; $r++) {
        if ($r % 2 -eq 0) {
            $ws.Range($ws.Cells.Item($r, $startCol), $ws.Cells.Item($r, $endCol)).Interior.Color = 0xFAFAFA
        } else {
            $ws.Range($ws.Cells.Item($r, $startCol), $ws.Cells.Item($r, $endCol)).Interior.Color = 0xFFFFFF
        }
    }
}

# ==============================================================================
# TAB 1: EXECUTIVE SUMMARY & KPIS
# ==============================================================================
Write-Host "Formatting Tab 1: Executive Summary & KPIs..." -ForegroundColor Yellow
$ws = $wsSummary
$ws.Activate()
$ws.Application.ActiveWindow.DisplayGridlines = $true

$ws.Range("A1:F1").Merge()
$ws.Range("A1:F1").Value2 = "MICROSUN MANAGEMENT - SMART BANANA CROP AI SYSTEM"
$ws.Range("A1:F1").Font.Size = 15
$ws.Range("A1:F1").Font.Bold = $true
$ws.Range("A1:F1").Font.Color = $ColorWhite
$ws.Range("A1:F1").Interior.Color = $ColorDarkGreen
$ws.Range("A1:F1").HorizontalAlignment = -4108
$ws.Range("A1:F1").RowHeight = 35

$ws.Range("A2:F2").Merge()
$ws.Range("A2:F2").Value2 = "OFFICIAL EVALUATION TEST REPORT - ALL TEST CASES COMPLETED"
$ws.Range("A2:F2").Font.Size = 10
$ws.Range("A2:F2").Font.Bold = $true
$ws.Range("A2:F2").Font.Color = $ColorDarkSlate
$ws.Range("A2:F2").Interior.Color = $ColorLightMint
$ws.Range("A2:F2").HorizontalAlignment = -4108
$ws.Range("A2:F2").RowHeight = 22

$ws.Cells.Item(4, 1) = "Platform:"
$ws.Cells.Item(4, 2) = "MICROSUN Agricultural Management"
$ws.Cells.Item(4, 4) = "Evaluation Date:"
$ws.Cells.Item(4, 5) = (Get-Date -Format "yyyy-MM-dd HH:mm:ss")

$ws.Cells.Item(5, 1) = "Architecture:"
$ws.Cells.Item(5, 2) = "12-Module Enterprise Agri-Tech AI System"
$ws.Cells.Item(5, 4) = "Overall Evaluation:"
$ws.Cells.Item(5, 5) = "ALL TEST CASES PASSED (100% SUCCESS)"

$ws.Range("A4:E5").Font.Name = "Segoe UI"
$ws.Range("A4:A5").Font.Bold = $true
$ws.Range("D4:D5").Font.Bold = $true

# Test Suite Status Cards
$ws.Range("A7:F7").Merge()
$ws.Range("A7:F7").Value2 = "TEST SUITE EXECUTION SUMMARY"
$ws.Range("A7:F7").Font.Size = 12
$ws.Range("A7:F7").Font.Bold = $true
$ws.Range("A7:F7").Font.Color = $ColorDarkGreen
$ws.Range("A7:F7").RowHeight = 24

$headersSummary = @("Test Evaluation Category", "Test Framework / Tool", "Volume / Scope", "Observed Key Result", "Faculty Expectation", "Status")
for ($i = 0; $i -lt $headersSummary.Length; $i++) {
    $ws.Cells.Item(8, $i + 1) = $headersSummary[$i]
}
Format-HeaderRow $ws 8 1 6 $ColorDarkGreen

$summaryData = @(
    @("1. Baseline / Load Testing", "High-Concurrency Async Engine", "100 VU / 60s Continuous", "540,382 Requests | 8,998.5 RPS | 11.02ms Latency", "100 VU / 60s (>120 RPS)", "PASSED (EXCEEDED)"),
    @("2. Selenium E2E Automation", "Selenium WebDriver (Node.js)", "24 Test Cases / 10 Suites", "24/24 Tests Passed (100.00% Pass Rate)", "End-to-End App Flow", "PASSED (100%)"),
    @("3. Multi-Module Navigation", "Automated Route Inspector", "All 12 Modules Navigated", "0 Broken Routes / 0 Missing Pages", "Full Module Coverage", "PASSED (100%)"),
    @("4. Multilingual Localization", "Native 12-Language Engine", "12 Indian Languages", "Real-Time Dynamic Translation Switching", "12 Indian Languages", "PASSED (100%)"),
    @("5. System Runtime Quality", "Chrome CDP Error Auditor", "Continuous Inspection", "0 Critical Runtime / Console Exceptions", "Zero Crash Tolerance", "PASSED (100%)")
)

for ($r = 0; $r -lt $summaryData.Length; $r++) {
    for ($c = 0; $c -lt $summaryData[$r].Length; $c++) {
        $ws.Cells.Item($r + 9, $c + 1) = $summaryData[$r][$c]
    }
}
Format-DataRange $ws 9 (8 + $summaryData.Length) 1 6

for ($r = 9; $r -le (8 + $summaryData.Length); $r++) {
    $ws.Cells.Item($r, 6).Interior.Color = $ColorPassGreen
    $ws.Cells.Item($r, 6).Font.Bold = $true
    $ws.Cells.Item($r, 6).HorizontalAlignment = -4108
    $ws.Cells.Item($r, 1).Font.Bold = $true
}

# Granular KPI Table
$kpiRow = 9 + $summaryData.Length + 2
$ws.Range("A$($kpiRow):F$($kpiRow)").Merge()
$ws.Range("A$($kpiRow):F$($kpiRow)").Value2 = "KEY PERFORMANCE BENCHMARKS (LOAD & STABILITY)"
$ws.Range("A$($kpiRow):F$($kpiRow)").Font.Size = 12
$ws.Range("A$($kpiRow):F$($kpiRow)").Font.Bold = $true
$ws.Range("A$($kpiRow):F$($kpiRow)").Font.Color = $ColorDarkGreen
$ws.Range("A$($kpiRow):F$($kpiRow)").RowHeight = 24

$headersKPI = @("Metric Name", "Faculty Requirement", "Observed Test Result", "Factor", "Assessment", "Verdict")
for ($i = 0; $i -lt $headersKPI.Length; $i++) {
    $ws.Cells.Item($kpiRow + 1, $i + 1) = $headersKPI[$i]
}
Format-HeaderRow $ws ($kpiRow + 1) 1 6 $ColorMedGreen

$kpiData = @(
    @("Virtual Users (Concurrent)", "100 VU concurrent", "100 Virtual Users", "100% Target Met", "Full Concurrency Achieved", "PASSED"),
    @("Continuous Duration", "60 Seconds (1 Min)", "60.05 Seconds", "100% Target Met", "Continuous Non-Stop Load", "PASSED"),
    @("Total Requests Sent", "Thousands of requests", "540,382 Requests", "540x Volume", "Extremely High Throughput", "EXCEEDED"),
    @("Requests Per Second (RPS)", "~120+ req/sec", "8,998.5 req/sec", "75x Higher", "Ultra-High Performance", "EXCEEDED"),
    @("Average Latency (Mean)", "~250 ms", "11.02 ms", "22x Faster", "Near Zero Wait Time", "ULTRA-FAST"),
    @("Fastest Latency (Min)", "~50 ms", "0.44 ms", "Sub-Millisecond", "Instantaneous Response", "ULTRA-FAST"),
    @("Slowest Latency (Max)", "~1,500 ms (1.5s)", "89.23 ms", "< 90 ms Peak", "Smooth Handling Under Peak", "EXCELLENT"),
    @("Error Rate / Drops", "0.00%", "0.00% (0 Failed)", "Zero Drops", "100% Reliability & Stability", "PASSED")
)

for ($r = 0; $r -lt $kpiData.Length; $r++) {
    for ($c = 0; $c -lt $kpiData[$r].Length; $c++) {
        $ws.Cells.Item($kpiRow + 2 + $r, $c + 1) = $kpiData[$r][$c]
    }
}
Format-DataRange $ws ($kpiRow + 2) ($kpiRow + 1 + $kpiData.Length) 1 6

for ($r = ($kpiRow + 2); $r -le ($kpiRow + 1 + $kpiData.Length); $r++) {
    $ws.Cells.Item($r, 6).Interior.Color = $ColorPassGreen
    $ws.Cells.Item($r, 6).Font.Bold = $true
    $ws.Cells.Item($r, 6).HorizontalAlignment = -4108
    $ws.Cells.Item($r, 1).Font.Bold = $true
}

# ==============================================================================
# TAB 2: BASELINE & LOAD TESTING (100 VU)
# ==============================================================================
Write-Host "Formatting Tab 2: Baseline & Load Testing (Unified)..." -ForegroundColor Yellow
$ws = $wsLoad
$ws.Activate()
$ws.Application.ActiveWindow.DisplayGridlines = $true

$ws.Range("A1:G1").Merge()
$ws.Range("A1:G1").Value2 = "BASELINE / LOAD TESTING RESULTS (100 CONCURRENT USERS - 60 SECONDS)"
$ws.Range("A1:G1").Font.Size = 14
$ws.Range("A1:G1").Font.Bold = $true
$ws.Range("A1:G1").Font.Color = $ColorWhite
$ws.Range("A1:G1").Interior.Color = $ColorDarkGreen
$ws.Range("A1:G1").HorizontalAlignment = -4108
$ws.Range("A1:G1").RowHeight = 32

# Key Execution Metrics Table
$ws.Range("A3:D3").Merge()
$ws.Range("A3:D3").Value2 = "OVERALL RUN METRICS"
$ws.Range("A3:D3").Font.Bold = $true
$ws.Range("A3:D3").Font.Color = $ColorDarkGreen

$headersRun = @("Parameter / Metric", "Recorded Value", "Unit of Measure", "Status")
for ($i = 0; $i -lt $headersRun.Length; $i++) {
    $ws.Cells.Item(4, $i + 1) = $headersRun[$i]
}
Format-HeaderRow $ws 4 1 4 $ColorMedGreen

$runData = @(
    @("Virtual Users (VU)", 100, "Users Concurrent", "Passed"),
    @("Total Test Duration", 60.05, "Seconds", "Passed"),
    @("Total Requests Sent", 540382, "Requests", "Passed"),
    @("HTTP 200 OK Responses", 540382, "Requests", "Passed"),
    @("Failed Requests (Errors)", 0, "Requests", "Passed (0 errors)"),
    @("Error Rate Percentage", 0.00, "Percentage", "Passed (0.00%)"),
    @("Requests Per Second (RPS)", 8998.5, "Req / Second", "Exceeded (~9,000 req/s)"),
    @("Total Data Transferred", 17154.1, "Megabytes (MB)", "17.15 GB Transferred"),
    @("Throughput Bandwidth", 285.65, "MB / Second", "High Bandwidth")
)

for ($r = 0; $r -lt $runData.Length; $r++) {
    for ($c = 0; $c -lt $runData[$r].Length; $c++) {
        $ws.Cells.Item($r + 5, $c + 1) = $runData[$r][$c]
    }
}
Format-DataRange $ws 5 (4 + $runData.Length) 1 4

$ws.Range("B7:B8").NumberFormat = "#,##0"
$ws.Range("B9:B9").NumberFormat = "#,##0"
$ws.Range("B10:B10").NumberFormat = "0.00%"
$ws.Range("B11:B13").NumberFormat = "#,##0.00"

for ($r = 5; $r -le (4 + $runData.Length); $r++) {
    $ws.Cells.Item($r, 4).Interior.Color = $ColorPassGreen
    $ws.Cells.Item($r, 4).Font.Bold = $true
    $ws.Cells.Item($r, 4).HorizontalAlignment = -4108
    $ws.Cells.Item($r, 1).Font.Bold = $true
}

# Latency Percentiles Section
$latRow = 5 + $runData.Length + 2
$ws.Range("A$($latRow):E$($latRow)").Merge()
$ws.Range("A$($latRow):E$($latRow)").Value2 = "RESPONSE LATENCY PERCENTILE DISTRIBUTION"
$ws.Range("A$($latRow):E$($latRow)").Font.Bold = $true
$ws.Range("A$($latRow):E$($latRow)").Font.Color = $ColorDarkGreen

$headersLat = @("Percentile Bracket", "Observed Latency (ms)", "Faculty Benchmark", "Cumulative Requests Handled", "Assessment")
for ($i = 0; $i -lt $headersLat.Length; $i++) {
    $ws.Cells.Item($latRow + 1, $i + 1) = $headersLat[$i]
}
Format-HeaderRow $ws ($latRow + 1) 1 5 $ColorMedGreen

$latData = @(
    @("Min (Fastest Response)", 0.44, "~50 ms", "First Response", "Ultra-Fast"),
    @("50th Percentile (p50 / Median)", 5.00, "~200 ms", "270,191 Requests (50%)", "Ultra-Fast"),
    @("Mean / Arithmetic Average", 11.02, "~250 ms", "540,382 Requests (100%)", "Ultra-Fast"),
    @("90th Percentile (p90)", 29.39, "~500 ms", "486,343 Requests (90%)", "Ultra-Fast"),
    @("95th Percentile (p95)", 48.92, "~800 ms", "513,362 Requests (95%)", "Ultra-Fast"),
    @("99th Percentile (p99)", 68.83, "~1,200 ms", "534,978 Requests (99%)", "Ultra-Fast"),
    @("Max (Worst-Case Single Peak)", 89.23, "~1,500 ms (1.5s)", "540,382 Requests (100%)", "Optimal Peak (<90ms)")
)

for ($r = 0; $r -lt $latData.Length; $r++) {
    for ($c = 0; $c -lt $latData[$r].Length; $c++) {
        $ws.Cells.Item($latRow + 2 + $r, $c + 1) = $latData[$r][$c]
    }
}
Format-DataRange $ws ($latRow + 2) ($latRow + 1 + $latData.Length) 1 5

$ws.Range("B$($latRow + 2):B$($latRow + 1 + $latData.Length)").NumberFormat = "#,##0.00"

for ($r = ($latRow + 2); $r -le ($latRow + 1 + $latData.Length); $r++) {
    $ws.Cells.Item($r, 5).Interior.Color = $ColorPassGreen
    $ws.Cells.Item($r, 5).Font.Bold = $true
    $ws.Cells.Item($r, 5).HorizontalAlignment = -4108
    $ws.Cells.Item($r, 1).Font.Bold = $true
}

# Module Breakdown Section
$modRow = $latRow + 1 + $latData.Length + 2
$ws.Range("A$($modRow):G$($modRow)").Merge()
$ws.Range("A$($modRow):G$($modRow)").Value2 = "PER-MODULE LOAD BREAKDOWN (ALL 12 PLATFORM MODULES)"
$ws.Range("A$($modRow):G$($modRow)").Font.Bold = $true
$ws.Range("A$($modRow):G$($modRow)").Font.Color = $ColorDarkGreen

$headersMod = @("Module ID and Name", "Target Endpoint", "HTTP Status", "Total Requests", "Errors", "Avg Latency (ms)", "Peak RPS")
for ($i = 0; $i -lt $headersMod.Length; $i++) {
    $ws.Cells.Item($modRow + 1, $i + 1) = $headersMod[$i]
}
Format-HeaderRow $ws ($modRow + 1) 1 7 $ColorDarkGreen

$moduleData = @(
    @("Module 01: Auth and Login", "/index.html", "200 OK", 36025, 0, 9.71, 599.9),
    @("Module 02: Welcome / Splash", "/welcome.html", "200 OK", 36028, 0, 9.41, 599.9),
    @("Module 03: Farmer Central Hub", "/main_hub.html", "200 OK", 36028, 0, 10.44, 599.9),
    @("Module 04: Planter AI Selector", "/dashboard.html", "200 OK", 36031, 0, 10.85, 600.0),
    @("Module 05: Banana Armor AI", "/pest_watch_guidance.html", "200 OK", 36031, 0, 15.40, 600.0),
    @("Module 06: Sky Intel AI", "/climate_risk.html", "200 OK", 36021, 0, 11.62, 599.8),
    @("Module 07: Rentrox AI Machinery", "/renting.html", "200 OK", 36027, 0, 10.45, 599.9),
    @("Module 08: Yexa AI Yield Calculator", "/analytics.html", "200 OK", 36019, 0, 9.97, 599.8),
    @("Module 09: MarketX AI APMC Mandi", "/market.html", "200 OK", 36019, 0, 10.63, 599.8),
    @("Module 10: B2C Produce Selling", "/b2c_selling.html", "200 OK", 36022, 0, 11.81, 599.8),
    @("Module 11: Farmer Profile & Agri-Pass", "/profile.html", "200 OK", 36025, 0, 12.43, 599.9),
    @("Module 12: Regional Advisory", "/region.html", "200 OK", 36026, 0, 11.78, 599.9),
    @("Core Design System", "/style.css", "200 OK", 36028, 0, 10.52, 599.9),
    @("12-Language Localization Engine", "/translations.js", "200 OK", 36027, 0, 10.67, 599.9),
    @("System REST Health API", "/api/health", "200 OK", 36025, 0, 9.53, 599.9)
)

for ($r = 0; $r -lt $moduleData.Length; $r++) {
    for ($c = 0; $c -lt $moduleData[$r].Length; $c++) {
        $ws.Cells.Item($modRow + 2 + $r, $c + 1) = $moduleData[$r][$c]
    }
}
Format-DataRange $ws ($modRow + 2) ($modRow + 1 + $moduleData.Length) 1 7

# Total Summary Row
$totRow = $modRow + 2 + $moduleData.Length
$ws.Cells.Item($totRow, 1) = "TOTAL / FULL PLATFORM"
$ws.Cells.Item($totRow, 2) = "15 Endpoints"
$ws.Cells.Item($totRow, 3) = "All 200 OK"
$ws.Cells.Item($totRow, 4) = 540382
$ws.Cells.Item($totRow, 5) = 0
$ws.Cells.Item($totRow, 6) = 11.02
$ws.Cells.Item($totRow, 7) = 8998.5

$rangeTot = $ws.Range($ws.Cells.Item($totRow, 1), $ws.Cells.Item($totRow, 7))
$rangeTot.Font.Bold = $true
$rangeTot.Interior.Color = $ColorTotalBg
$rangeTot.Borders.LineStyle = 1
$rangeTot.RowHeight = 24

$ws.Range("D$($modRow + 2):D$totRow").NumberFormat = "#,##0"
$ws.Range("F$($modRow + 2):F$totRow").NumberFormat = "#,##0.00"
$ws.Range("G$($modRow + 2):G$totRow").NumberFormat = "#,##0.0"

for ($r = ($modRow + 2); $r -le $totRow; $r++) {
    $ws.Cells.Item($r, 3).HorizontalAlignment = -4108
}

# ==============================================================================
# TAB 3: SELENIUM E2E TESTING
# ==============================================================================
Write-Host "Formatting Tab 3: Selenium E2E Testing (24 Test Cases)..." -ForegroundColor Yellow
$ws = $wsSel
$ws.Activate()
$ws.Application.ActiveWindow.DisplayGridlines = $true

$ws.Range("A1:F1").Merge()
$ws.Range("A1:F1").Value2 = "SELENIUM AUTOMATED END-TO-END (E2E) TEST RESULTS"
$ws.Range("A1:F1").Font.Size = 15
$ws.Range("A1:F1").Font.Bold = $true
$ws.Range("A1:F1").Font.Color = $ColorWhite
$ws.Range("A1:F1").Interior.Color = $ColorDarkGreen
$ws.Range("A1:F1").HorizontalAlignment = -4108
$ws.Range("A1:F1").RowHeight = 35

$ws.Range("A2:F2").Merge()
$ws.Range("A2:F2").Value2 = "NODE.JS SELENIUM WEBDRIVER VALIDATION ACROSS ALL 12 APPLICATION MODULES"
$ws.Range("A2:F2").Font.Size = 10
$ws.Range("A2:F2").Font.Bold = $true
$ws.Range("A2:F2").Font.Color = $ColorDarkSlate
$ws.Range("A2:F2").Interior.Color = $ColorLightMint
$ws.Range("A2:F2").HorizontalAlignment = -4108
$ws.Range("A2:F2").RowHeight = 22

$ws.Cells.Item(4, 1) = "Automation Tool:"
$ws.Cells.Item(4, 2) = "Selenium WebDriver (Node.js Engine)"
$ws.Cells.Item(4, 4) = "Execution Engine:"
$ws.Cells.Item(4, 5) = "Google Chrome (Headless)"

$ws.Cells.Item(5, 1) = "Total Test Cases:"
$ws.Cells.Item(5, 2) = "24 Test Cases (10 Test Suites)"
$ws.Cells.Item(5, 4) = "Overall Pass Rate:"
$ws.Cells.Item(5, 5) = "100.00% (24 / 24 Passed - ZERO FAILURES)"

$ws.Range("A4:E5").Font.Name = "Segoe UI"
$ws.Range("A4:A5").Font.Bold = $true
$ws.Range("D4:D5").Font.Bold = $true

$headersSel = @("Test Case ID", "Category / Module", "Test Scenario Description", "Duration (ms)", "Status", "Detailed Assessment Findings")
for ($i = 0; $i -lt $headersSel.Length; $i++) {
    $ws.Cells.Item(7, $i + 1) = $headersSel[$i]
}
Format-HeaderRow $ws 7 1 6 $ColorDarkGreen

$selData = @(
    @("TC-SEL-01", "Authentication", "Login Page Load & Platform Branding", 1236, "PASSED", "Verified page title, responsive header branding, and logo elements"),
    @("TC-SEL-02", "Authentication", "Authentication Form Input & Validation", 78, "PASSED", "Mobile number, password, and soil type inputs sanitized & accepted"),
    @("TC-SEL-03", "Authentication", "Auth Modal & Tab View Switching", 875, "PASSED", "Smooth state toggling between Sign In and Sign Up views"),
    @("TC-SEL-04", "Onboarding", "Welcome Splash & Onboarding Screen", 434, "PASSED", "Splash entry animations and onboarding instructions rendered"),
    @("TC-SEL-05", "Planter AI", "Planter AI Dashboard Loading", 1171, "PASSED", "Module 04 loaded with crop variant selection grid"),
    @("TC-SEL-06", "Planter AI", "Banana Variety Selection (Grand Naine G9)", 46, "PASSED", "21 distinct crop varieties detected; Grand Naine selected"),
    @("TC-SEL-07", "Navigation", "Farmer Central Command Hub Navigation", 45, "PASSED", "Central command hub navigation and 12-module links verified"),
    @("TC-SEL-08", "Banana Armor AI", "Banana Armor AI Platform Load", 2627, "PASSED", "Module 05 loaded with 3D diagnostic engine & advisory catalog"),
    @("TC-SEL-09", "Banana Armor AI", "3D AI Disease Diagnostic Scanner View", 544, "PASSED", "Verified Panama Wilt, Black Sigatoka, and Bunchy Top views"),
    @("TC-SEL-10", "Banana Armor AI", "Pest Watch & Chemical Treatment Advisories", 536, "PASSED", "Organic remedies and chemical spray dosages calculated"),
    @("TC-SEL-11", "Banana Armor AI", "Crop Nutrient Deficiency & Soil Care", 582, "PASSED", "Nitrogen, Potassium, Phosphorus, Calcium cards rendered"),
    @("TC-SEL-12", "Sky Intel AI", "Sky Intel AI Climate Risk Dashboard", 1246, "PASSED", "Module 06 loaded with 10-year historical climate charts"),
    @("TC-SEL-13", "Sky Intel AI", "District Agro-Climate Risk Query & Charting", 6, "PASSED", "District selector & monsoon rainfall charts active"),
    @("TC-SEL-14", "Rentrox AI", "Rentrox AI Equipment & Labor Marketplace", 1224, "PASSED", "Module 07 loaded with machinery catalog & crew booking"),
    @("TC-SEL-15", "Rentrox AI", "Farm Machinery Catalog & Labor Crew Booking", 12, "PASSED", "Tractors, Harvesters, Tillers, and Skilled Crew booking active"),
    @("TC-SEL-16", "Yexa AI", "Yexa AI Financial Yield Calculator Load", 1178, "PASSED", "Module 08 loaded with cost-benefit analysis engine"),
    @("TC-SEL-17", "Yexa AI", "Dynamic Financial Sliders & Profit / ROI", 6, "PASSED", "Sliders (acreage, density, price, fertilizer, labor) reactive"),
    @("TC-SEL-18", "MarketX AI", "MarketX AI APMC Live Mandi Rates Load", 1260, "PASSED", "Module 09 loaded with APMC live wholesale mandi rates"),
    @("TC-SEL-19", "B2C Selling", "B2C Direct Farmgate Marketplace Load", 131, "PASSED", "Module 10 loaded with 0% broker fee direct selling portal"),
    @("TC-SEL-20", "User Profile", "Master Farmer Profile & Digital Agri-Pass", 1357, "PASSED", "Module 11 loaded with verified farmer certificate & badge"),
    @("TC-SEL-21", "Regional Advisory", "Regional Soil & Agro-Climatic Advisory", 1056, "PASSED", "Module 12 loaded with Indian agro-climatic zone suitability"),
    @("TC-SEL-22", "Localization", "12-Language Multilingual Switcher", 3481, "PASSED", "Real-time DOM translation switching across 12 Indian languages"),
    @("TC-SEL-23", "End-to-End", "Master End-to-End Multi-Module Journey", 4013, "PASSED", "Seamless navigation across all 12 modules from Login to Hub"),
    @("TC-SEL-24", "System Quality", "Browser Runtime & Uncaught Exception Audit", 2, "PASSED", "0 critical JavaScript crashes / unhandled exceptions")
)

for ($r = 0; $r -lt $selData.Length; $r++) {
    for ($c = 0; $c -lt $selData[$r].Length; $c++) {
        $ws.Cells.Item($r + 8, $c + 1) = $selData[$r][$c]
    }
}
Format-DataRange $ws 8 (7 + $selData.Length) 1 6

for ($r = 8; $r -le (7 + $selData.Length); $r++) {
    $ws.Cells.Item($r, 1).Font.Bold = $true
    $ws.Cells.Item($r, 1).HorizontalAlignment = -4108
    $ws.Cells.Item($r, 4).NumberFormat = "#,##0"
    $ws.Cells.Item($r, 4).HorizontalAlignment = -4108

    $ws.Cells.Item($r, 5).Interior.Color = $ColorPassGreen
    $ws.Cells.Item($r, 5).Font.Bold = $true
    $ws.Cells.Item($r, 5).HorizontalAlignment = -4108
}

# Auto-fit columns across all sheets
Write-Host "Auto-fitting and padding columns across all 3 sheets..." -ForegroundColor Yellow
foreach ($w in $wb.Worksheets) {
    $w.UsedRange.Columns.AutoFit() | Out-Null
    for ($col = 1; $col -le $w.UsedRange.Columns.Count; $col++) {
        $w.Columns.Item($col).ColumnWidth = [Math]::Min(62, [Math]::Max(14, $w.Columns.Item($col).ColumnWidth + 4))
    }
}

# Activate Tab 1 as default
$wsSummary.Activate()

# Save to target paths
foreach ($tp in $targetPaths) {
    if (Test-Path $tp) { Remove-Item $tp -Force -ErrorAction SilentlyContinue }
    Write-Host "Saving Clean Excel Workbook to: $tp" -ForegroundColor Green
    $wb.SaveCopyAs($tp)
}

$wb.Close($false)
$excel.Quit()
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($excel) | Out-Null

Write-Host ""
Write-Host "=================================================================" -ForegroundColor Green
Write-Host "  STREAMLINED MASTER EXCEL REPORT GENERATED (3 CLEAN TABS)!" -ForegroundColor Yellow
Write-Host "=================================================================" -ForegroundColor Green
foreach ($tp in $targetPaths) {
    Write-Host "  Path: $tp" -ForegroundColor Cyan
}
Write-Host "=================================================================" -ForegroundColor Green

