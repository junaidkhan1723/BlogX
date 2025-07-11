export const EMAIL_VERIFY_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Email Verification - BlogX</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #1e293b;
      font-family: 'Segoe UI', sans-serif;
      color: #e2e8f0;
    }
    .container {
      max-width: 500px;
      margin: 50px auto;
     background-color: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.4);
    }
    .header {
      background: linear-gradient(135deg, #7c3aed, #4f46e5, #06b6d4);
      text-align: center;
      padding: 30px 20px 20px;
    }
    .logo {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background-color: white;
      margin: 0 auto 12px;
      overflow: hidden;
    }
    .logo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .header h1 {
      margin: 0;
      font-size: 22px;
      color: white;
    }
    .content {
      padding: 30px;
      font-size: 15px;
      line-height: 1.6;
    }
    .otp {
      background: #4f46e5;
      padding: 12px;
      color: white;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      border-radius: 6px;
      margin: 10px 0 20px;
    }
    .footer {
      text-align: center;
      padding: 20px;
      font-size: 13px;
      color: #94a3b8;
    }
    .social a {
      color: #38bdf8;
      text-decoration: none;
      margin: 0 8px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">
        <img src="https://www.shutterstock.com/image-vector/xb-bx-abstract-outstanding-professional-600nw-2366471787.jpg" alt="BlogX Logo" />
      </div>
      <h1>Verify Your Email 📩</h1>
    </div>
    <div class="content">
      <p>Hey {{username}} 👋,</p>
      <p>Welcome to <strong>BlogX</strong>! We're thrilled to have you here.</p>
      <p>To keep your account secure and fully activated, we just need to confirm your email address.</p>
      <p>Your registered email is: <strong style="color:#60a5fa">{{email}}</strong></p>
      <p>Use the OTP below to verify your email:</p>
      <div class="otp">{{otp}}</div>
      <p><strong>Note:</strong> This OTP will expire in 15 Minutes. If you didn’t request this, you can safely ignore it.</p>
      <p>Let’s get started with sharing, learning, and growing together 🚀</p>
    </div>
    <div class="footer">
      🔗 <a href="https://github.com/junaidkhan1723">GitHub</a> |
      💼 <a href="https://linkedin.com/in/junaidkhan1723">LinkedIn</a><br>
      Powered by :: <strong>Junaid Khan</strong><br>
      © 2025 BlogX
    </div>
  </div>
</body>
</html>
`;


export const PASSWORD_RESET_TEMPLATE = `

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Reset Password - BlogX</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #1e293b;
      font-family: 'Segoe UI', sans-serif;
      color: #e2e8f0;
    }
    .container {
      max-width: 500px;
      margin: 50px auto;
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.4);
    }
    .header {
      background: linear-gradient(135deg, #7c3aed, #4f46e5, #06b6d4);
      text-align: center;
      padding: 30px 20px 20px;
    }
    .logo {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background-color: white;
      margin: 0 auto 12px;
      overflow: hidden;
    }
    .logo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .header h1 {
      margin: 0;
      font-size: 22px;
      color: white;
    }
    .content {
      padding: 30px;
      font-size: 15px;
      line-height: 1.6;
    }
    .otp {
      background: #4f46e5;
      padding: 12px;
      color: white;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      border-radius: 6px;
      margin: 10px 0 20px;
    }
    .footer {
      text-align: center;
      padding: 20px;
      font-size: 13px;
      color: #94a3b8;
    }
    .social a {
      color: #38bdf8;
      text-decoration: none;
      margin: 0 8px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">
        <img src="https://www.shutterstock.com/image-vector/xb-bx-abstract-outstanding-professional-600nw-2366471787.jpg" alt="BlogX Logo" />
      </div>
      <h1>Password Reset Request 🔐</h1>
    </div>
    <div class="content">
      <p>Hi {{username}} 👋,</p>
      <p>We received a request to reset the password for your BlogX account.</p>
      <p>Email associated with the request: <strong style="color:#60a5fa">{{email}}</strong></p>
      <p>Please use the OTP below to continue resetting your password:</p>
      <div class="otp">{{otp}}</div>
      <p>This OTP is valid for the next 15 minutes.</p>
      <p>If you didn’t request a password reset, don’t worry — your account is still safe. Just ignore this message.</p>
      <p>We're always here if you need help. Stay secure ✨</p>
    </div>
    <div class="footer">
      🔗 <a href="https://github.com/junaidkhan1723">GitHub</a> |
      💼 <a href="https://linkedin.com/in/junaidkhan1723">LinkedIn</a><br>
      Powered by :: <strong>Junaid Khan</strong><br>
      © 2025 BlogX
    </div>
  </div>
</body>
</html>
`;


export const WELCOME_TEMPLATE = `

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Welcome to BlogX!</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #1e293b;
      font-family: 'Segoe UI', sans-serif;
      color: #e2e8f0;
    }
    .container {
      max-width: 520px;
      margin: 50px auto;
      background-color: white;;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0,0,0,0.4);
    }
    .header {
      background: linear-gradient(135deg, #7c3aed, #4f46e5, #06b6d4);
      color: white;
      text-align: center;
      padding: 30px 20px 20px;
    }
    .logo {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background-color: white;
      margin: 0 auto 12px;
      overflow: hidden;
    }
    .logo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: bold;
    }
    .content {
      padding: 30px;
      font-size: 15px;
      line-height: 1.6;
    }
    .content p {
      margin-bottom: 16px;
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      margin-top: 20px;
      background: #4f46e5;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
    }
    .footer {
      text-align: center;
      padding: 20px;
      font-size: 13px;
      color: #94a3b8;
    }
    .social a {
      color: #38bdf8;
      text-decoration: none;
      margin: 0 8px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">
        <img src="https://www.shutterstock.com/image-vector/xb-bx-abstract-outstanding-professional-600nw-2366471787.jpg" />
      </div>
      <h1>Welcome to BlogX! 🎉</h1>
    </div>
    <div class="content">
      <p>Hey {{username}} 👋,</p>
      <p>Thanks for joining <strong>BlogX</strong> — your space for exploring tech blogs, dev stories, and the latest in innovation.</p>
      <p>We've registered your email as: <strong style="color:#60a5fa">{{email}}</strong></p>
      <p>Start your journey and share your voice with the world!</p>
      <a class="button" href="https://blog-x-six.vercel.app/">Go to Dashboard 🚀</a>
    </div>
    <div class="footer">
      <div class="social">
        🔗 <a href="https://github.com/junaidkhan1723">GitHub</a> |
        💼 <a href="https://www.linkedin.com/in/junaidkhan1723">LinkedIn</a>
      </div>
      <br>
      Powered by :: <strong>Junaid Khan</strong><br>
      © 2025 BlogX. All rights reserved.
    </div>
  </div>
</body>
</html>

`;
