// registerOtpHtml
export const registerOtpHtml = (name: string, otp: string) => {
   return `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>VERIFY YOUR IDENTITY</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Roboto+Condensed:wght@400;700&display=swap');

body {
  font-family: 'Roboto Condensed', sans-serif;
  line-height: 1.6;
  color: #e0e0e0;
  margin: 0;
  padding: 0;
  background-color: #0a0a0a;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 0;
  border: 2px solid #ff00a6;
  background-color: #121212;
}

.header {
  text-align: center;
  padding: 20px 0;
  background: linear-gradient(90deg, #000000, #1a0026);
  border-bottom: 3px solid #00ffff;
}

.header h2 {
  font-family: 'Orbitron', sans-serif;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin: 0;
  text-shadow: 0 0 10px #00ffff;
}

.content {
  padding: 30px;
  background-color: rgba(20, 20, 30, 0.7);
}

.otp-container {
  margin: 25px 0;
  text-align: center;
  background: linear-gradient(45deg, #120014, #001420);
  padding: 20px;
  border-radius: 8px;
}

.otp-code {
  letter-spacing: 8px;
  font-size: 32px;
  font-weight: bold;
  font-family: 'Orbitron', sans-serif;
  color: #ffffff;
  padding: 15px;
  background: rgba(0, 0, 0, 0.7);
  display: inline-block;
  text-shadow: 0 0 5px #ff00a6;
}

.warning {
  color: #ff5555;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: center;
  margin-top: 20px;
  padding: 10px;
  border: 1px dashed #ff5555;
}

.footer {
  text-align: center;
  font-size: 12px;
  color: #999999;
  background: #0a0a0a;
  padding: 15px;
  border-top: 1px solid #333;
}

.timestamp {
  font-family: 'Orbitron', sans-serif;
  color: #00ffff;
  font-size: 10px;
  text-align: right;
  margin-top: 20px;
}
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <h2>Identity Verification</h2>
  </div>
  <div class="content">
    <p>Greetings, <strong style="color: #00ffff;">${name}</strong>,</p>
    <p>Your registration has been detected in our network. To validate your digital identity, you must enter the following authentication code:</p>
    
    <div class="otp-container">
      <div class="otp-code">${otp}</div>
    </div>
    
    <p class="warning">This code will self-destruct in 5 minutes</p>
    
    <p>If you did not initiate this verification sequence, report immediately.</p>
    
    <p>Stay Vigilant,<br><span style="color: #ff00a6; font-weight: bold;">CYBER-CORE NETWORK</span></p>
    
    <div class="timestamp">
      ${new Date().toISOString().replace('T', ' ').substr(0, 19)} // SYSTEM TIMESTAMP
    </div>
  </div>
  <div class="footer">
    <p>This is an automated transmission. Do not respond.</p>
    <p>&copy; ${new Date().getFullYear()} CYBER-CORE INDUSTRIES // ALL RIGHTS SECURED</p>
  </div>
</div>
</body>
</html>
`;
};

// resetPasswordOtpHtml
export const resetPasswordOtpHtml = (name: string, otp: string) => {
   return `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SECURITY OVERRIDE</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Roboto+Condensed:wght@400;700&display=swap');

body {
  font-family: 'Roboto Condensed', sans-serif;
  line-height: 1.6;
  color: #e0e0e0;
  margin: 0;
  padding: 0;
  background-color: #0a0a0a;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 0;
  border: 2px solid #ff00a6;
  background-color: #121212;
}

.header {
  text-align: center;
  padding: 20px 0;
  background: linear-gradient(90deg, #000000, #1a0026);
  border-bottom: 3px solid #ff0000;
}

.header h2 {
  font-family: 'Orbitron', sans-serif;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin: 0;
  text-shadow: 0 0 10px #ff0000;
}

.content {
  padding: 30px;
  background-color: rgba(20, 20, 30, 0.7);
}

.otp-container {
  margin: 25px 0;
  text-align: center;
  background: linear-gradient(45deg, #140000, #140014);
  padding: 20px;
  border-radius: 8px;
}

.otp-code {
  letter-spacing: 8px;
  font-size: 32px;
  font-weight: bold;
  font-family: 'Orbitron', sans-serif;
  color: #ffffff;
  padding: 15px;
  background: rgba(0, 0, 0, 0.7);
  display: inline-block;
  text-shadow: 0 0 5px #ff0000;
}

.warning {
  color: #ff5555;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: center;
  margin-top: 20px;
  padding: 10px;
  border: 1px dashed #ff5555;
}

.alert-box {
  background: rgba(20, 0, 0, 0.3);
  border-left: 3px solid #ff0000;
  padding: 15px;
  margin: 20px 0;
}

.footer {
  text-align: center;
  font-size: 12px;
  color: #999999;
  background: #0a0a0a;
  padding: 15px;
  border-top: 1px solid #333;
}

.timestamp {
  font-family: 'Orbitron', sans-serif;
  color: #ff0000;
  font-size: 10px;
  text-align: right;
  margin-top: 20px;
}
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <h2>Security Override</h2>
  </div>
  <div class="content">
    <p>User <strong style="color: #ff0000;">${name}</strong>,</p>
    <p>A password reset sequence has been initiated for your account. Use the following override code to regain system access:</p>
    
    <div class="otp-container">
      <div class="otp-code">${otp}</div>
    </div>
    
    <p class="warning">Security protocol expires in 5 minutes</p>
    
    <div class="alert-box">
      <p>⚠ If you did not request this security override, your account may be compromised. Secure your system immediately.</p>
    </div>
    
    <p>Maintain Vigilance,<br><span style="color: #ff0000; font-weight: bold;">CYBER-CORE SECURITY</span></p>
    
    <div class="timestamp">
      ${new Date().toISOString().replace('T', ' ').substr(0, 19)} // INCIDENT LOGGED
    </div>
  </div>
  <div class="footer">
    <p>This is an automated security transmission. Do not respond.</p>
    <p>&copy; ${new Date().getFullYear()} CYBER-CORE INDUSTRIES // ALL SYSTEMS SECURED</p>
  </div>
</div>
</body>
</html>
`;
};