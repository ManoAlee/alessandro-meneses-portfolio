
$process = Start-Process -FilePath "npm" -ArgumentList "run dev" -PassThru -NoNewWindow
$id = $process.Id
"Started process with ID: $id" | Out-File "server_pid.txt"
