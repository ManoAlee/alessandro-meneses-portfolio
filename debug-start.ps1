
$log = "debug_output.txt"
"Starting..." | Out-File $log
try {
    # Check node
    node --version | Out-File $log -Append
    npm --version | Out-File $log -Append
    
    # Run dev
    cmd /c "npm run dev" | Out-File $log -Append
} catch {
    $_ | Out-File $log -Append
}
"Done." | Out-File $log -Append
