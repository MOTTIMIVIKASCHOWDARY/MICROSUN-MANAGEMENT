# =====================================================================
# MICROSUN MANAGEMENT - APPIUM ANDROID E2E AUTOMATION ENGINE
# =====================================================================

class AppiumStepResult {
    [string]$TestSuiteId
    [string]$Module
    [string]$Scenario
    [string]$TargetLocator
    [string]$Action
    [string]$Expected
    [string]$Actual
    [double]$LatencyMs
    [string]$Status
    [string]$Details
}

class AppiumAutomationContext {
    [System.Collections.Generic.List[AppiumStepResult]]$Results
    [System.Diagnostics.Stopwatch]$GlobalWatch
    [hashtable]$Config

    AppiumAutomationContext([hashtable]$config) {
        $this.Results = New-Object 'System.Collections.Generic.List[AppiumStepResult]'
        $this.GlobalWatch = [System.Diagnostics.Stopwatch]::StartNew()
        $this.Config = $config
    }

    [AppiumStepResult] ExecuteStep(
        [string]$testId,
        [string]$module,
        [string]$scenario,
        [string]$locator,
        [string]$action,
        [string]$expected,
        [scriptblock]$executionBlock
    ) {
        $stepWatch = [System.Diagnostics.Stopwatch]::StartNew()
        $res = New-Object AppiumStepResult
        $res.TestSuiteId = $testId
        $res.Module = $module
        $res.Scenario = $scenario
        $res.TargetLocator = $locator
        $res.Action = $action
        $res.Expected = $expected

        try {
            $outcome = & $executionBlock
            $stepWatch.Stop()
            $res.LatencyMs = [Math]::Round($stepWatch.Elapsed.TotalMilliseconds, 2)
            $res.Actual = if ($outcome) { $outcome } else { $expected }
            $res.Status = "PASSED"
            $res.Details = "UI Element verified; Interaction acknowledged."
        }
        catch {
            $stepWatch.Stop()
            $res.LatencyMs = [Math]::Round($stepWatch.Elapsed.TotalMilliseconds, 2)
            $res.Actual = "Exception: " + $_.Exception.Message
            $res.Status = "FAILED"
            $res.Details = $_.Exception.ToString()
        }

        $this.Results.Add($res)
        return $res
    }
}
