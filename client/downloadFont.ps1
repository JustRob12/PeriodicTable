$url = "https://github.com/google/fonts/raw/main/ofl/orbitron/Orbitron-Bold.ttf"
$output = "assets/fonts/Orbitron-Bold.ttf"
Invoke-WebRequest -Uri $url -OutFile $output
