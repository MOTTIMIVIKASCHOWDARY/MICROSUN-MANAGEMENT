import urllib.request
import ssl

def download_file(url, filename):
    print(f"Downloading {url} to {filename}...")
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
    }
    
    # Disable SSL verification if needed, but try standard first
    context = ssl.create_default_context()
    context.check_hostname = False
    context.verify_mode = ssl.CERT_NONE
    
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, context=context) as response:
            with open(filename, 'wb') as out_file:
                out_file.write(response.read())
        print("Download successful!")
        return True
    except Exception as e:
        print(f"Failed to download: {e}")
        return False

# Wikimedia URLs
drill_url = "https://upload.wikimedia.org/wikipedia/commons/e/ea/John_Deere_tractor_with_seed_drill.jpg"
transplanter_url = "https://upload.wikimedia.org/wikipedia/commons/9/91/Rice_Transplanter_in_India.jpg"

download_file(drill_url, "seed_drill.jpg")
download_file(transplanter_url, "rice_transplanter.jpg")
