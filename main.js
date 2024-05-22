// Mendapatkan alamat IP publik dan informasi lainnya
async function getPublicIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        document.getElementById('public-ip').textContent = 'Public IP: ' + data.ip;
        await getCityAndISP(data.ip);
    } catch (error) {
        document.getElementById('public-ip').textContent = 'Public IP: Error';
    }
}

// Mendapatkan alamat IP lokal
function getLocalIP() {
    const RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    const pc = new RTCPeerConnection({iceServers: []});
    const noop = () => {};
    pc.createDataChannel('');
    pc.createOffer(pc.setLocalDescription.bind(pc), noop);
    pc.onicecandidate = (event) => {
        if (event && event.candidate && event.candidate.candidate) {
            const localIP = event.candidate.candidate.split(' ')[4];
            document.getElementById('local-ip').textContent = 'Local IP: ' + localIP;
            pc.onicecandidate = noop;
        }
    };
}

// Mendapatkan informasi kota dan ISP berdasarkan alamat IP
async function getCityAndISP(ip) {
    try {
        const response = await fetch(`https://ipapi.co/${ip}/json/`);
        const data = await response.json();
        document.getElementById('city').textContent = 'City: ' + data.city;
        document.getElementById('isp').textContent = 'ISP: ' + data.org;
    } catch (error) {
        document.getElementById('city').textContent = 'City: Error';
        document.getElementById('isp').textContent = 'ISP: Error';
    }
}

// Mendapatkan informasi perangkat, termasuk merek HP
async function getDeviceInfo() {
    const userAgent = navigator.userAgent;
    let deviceName = 'Unknown Device';
    let deviceBrand = 'Unknown Brand';
    if (/Mobile|Android|iPhone|iPad|iPod/i.test(userAgent)) {
        if (/Android/i.test(userAgent)) {
            deviceName = 'Mobile Device';
            deviceBrand = 'Android';
        } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
            deviceName = 'Mobile Device';
            deviceBrand = 'iOS';
        } 
    } else if (/Tablet/i.test(userAgent)) {
        deviceName = 'Tablet';
        if (/Android/i.test(userAgent)) {
            deviceBrand = 'Android';
        } else if (/iPad/i.test(userAgent)) {
            deviceBrand = 'iOS';
        } 
    } else if (/Windows/i.test(userAgent)) {
        deviceName = 'Windows PC';
    } else if (/Macintosh|Mac OS X/i.test(userAgent)) {
        deviceName = 'Macintosh';
    } else if (/Linux/i.test(userAgent)) {
        deviceName = 'Linux PC';
    }
    document.getElementById('device-info').textContent = `Device Info: ${deviceName}, Brand: ${deviceBrand}`;
    
    if (deviceBrand === 'Android') {
        const battery = await navigator.getBattery();
        document.getElementById('battery-status').textContent = 'Battery Status: ' + (battery.level * 100).toFixed(2) + '%';
    } else {
        document.getElementById('battery-status').textContent = 'Battery Status: Not available (Only available on Android devices)';
    }
}

// Mendapatkan informasi jaringan
function getNetworkInfo() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
        let networkType = 'Unknown';
        switch (connection.type) {
            case 'bluetooth':
                networkType = 'Bluetooth';
                break;
            case 'cellular':
                networkType = 'Cellular';
                break;
            case 'ethernet':
                networkType = 'Ethernet';
                break;
            case 'wifi':
                networkType = 'WiFi';
                break;
            case 'wimax':
                networkType = 'WiMax';
                break;
            case 'none':
                networkType = 'None';
                break;
            case 'other':
                networkType = 'Other';
                break;
            case 'unknown':
                networkType = 'Unknown';
                break;
        }
        document.getElementById('network-info').textContent = 'Network Info: ' + networkType;
    } else {
        document.getElementById('network-info').textContent = 'Network Info: Not available';
    }
}

// Memanggil fungsi-fungsi tersebut
function getDeviceInfo() {
    const deviceInfo = {
        Platform: navigator.platform,
        "User Agent": navigator.userAgent,
        "App Version": navigator.appVersion,
        "App Name": navigator.appName,
        Language: navigator.language,
        "Languages": navigator.languages.join(', '),
        Online: navigator.onLine,
        "Cookie Enabled": navigator.cookieEnabled,
        "Hardware Concurrency": navigator.hardwareConcurrency,
        "Max Touch Points": navigator.maxTouchPoints
    };

    const deviceInfoText = Object.entries(deviceInfo)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');
    
    document.getElementById('device-info').textContent = deviceInfoText;
}

function getBatteryStatus() {
    navigator.getBattery().then(function(battery) {
        const batteryStatus = `
            Level: ${(battery.level * 100).toFixed(0)}%
            Charging: ${battery.charging ? "Yes" : "No"}
        `;
        document.getElementById('battery-status').textContent = batteryStatus;
    });
}

function getNetworkInfo() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
        const networkInfo = `
            Type: ${connection.type}
            Effective Type: ${connection.effectiveType}
            Downlink: ${connection.downlink} Mb/s
            RTT: ${connection.rtt} ms
        `;
        document.getElementById('network-info').textContent = networkInfo;
    } else {
        document.getElementById('network-info').textContent = "Network information not available";
    }
}

function getBrowserInfo() {
    const browserInfo = `
        App Name: ${navigator.appName}
        App Code Name: ${navigator.appCodeName}
        Product: ${navigator.product}
        Vendor: ${navigator.vendor}
    `;
    document.getElementById('browser-info').textContent = browserInfo;
}

async function getPublicIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        document.getElementById('public-ip').textContent = `Public IP: ${data.ip}`;
    } catch (error) {
        document.getElementById('public-ip').textContent = "Public IP: Unable to retrieve";
    }
}

function getLocalIP() {
    const RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;

    if (RTCPeerConnection) {
        const rtc = new RTCPeerConnection({iceServers: []});
        rtc.createDataChannel('');
        rtc.createOffer().then(offer => rtc.setLocalDescription(offer));
        rtc.onicecandidate = event => {
            if (event && event.candidate && event.candidate.candidate) {
                const parts = event.candidate.candidate.split(' ');
                const addr = parts[4];
                if (addr && addr.indexOf('.') !== -1) {
                    document.getElementById('local-ip').textContent = `Local IP: ${addr}`;
                }
            }
        };
    } else {
        document.getElementById('local-ip').textContent = "Local IP: Not supported";
    }
}

async function getLocationInfo() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        document.getElementById('city').textContent = `City: ${data.city}`;
        document.getElementById('isp').textContent = `ISP: ${data.org}`;
    } catch (error) {
        document.getElementById('city').textContent = "City: Unable to retrieve";
        document.getElementById('isp').textContent = "ISP: Unable to retrieve";
    }
}

window.onload = function() {
    getDeviceInfo();
    getBatteryStatus();
    getNetworkInfo();
    getBrowserInfo();
    getPublicIP();
    getLocalIP();
    getLocationInfo();
};
document.addEventListener("DOMContentLoaded", function() {
            // Mendapatkan data kota dan provinsi dari IP
            fetch('http://ip-api.com/json/')
            .then(response => response.json())
            .then(data => {
                var cityElement = document.getElementById("city");
                cityElement.innerHTML = "City: " + data.city;

                var stateElement = document.getElementById("state");
                stateElement.innerHTML = "State: " + data.regionName;
            })
            .catch(error => console.error('Error:', error));
        });
