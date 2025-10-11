# EmailJS Setup Guide

## Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Add Email Service
1. Go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended)
4. Follow the instructions to connect your email (`dannydoo1234@gmail.com`)
5. Copy the **Service ID** (e.g., `service_abc1234`)

## Step 3: Create Email Template
1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. **Template Name**: Portfolio Contact Form
4. **Template ID**: Copy this (e.g., `template_xyz5678`)

### Email Template Configuration

#### **Subject Line:**
```
New Contact from {{from_name}} - {{subject}}
```

#### **Email Body (HTML):**
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .email-container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #8e3cff 0%, #34F0E0 100%);
            color: white;
            padding: 20px;
            border-radius: 8px 8px 0 0;
            margin: -30px -30px 30px -30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .field {
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
        }
        .field:last-child {
            border-bottom: none;
        }
        .label {
            font-weight: bold;
            color: #8e3cff;
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: 1px;
            margin-bottom: 5px;
            display: block;
        }
        .value {
            color: #333;
            font-size: 16px;
            word-wrap: break-word;
        }
        .message-box {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
            border-left: 4px solid #34F0E0;
            margin-top: 10px;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #eee;
            text-align: center;
            color: #999;
            font-size: 12px;
        }
        .reply-button {
            display: inline-block;
            background: #8e3cff;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>📧 New Portfolio Contact</h1>
        </div>

        <div class="field">
            <span class="label">From:</span>
            <div class="value">{{from_name}}</div>
        </div>

        <div class="field">
            <span class="label">Email:</span>
            <div class="value"><a href="mailto:{{reply_to}}" style="color: #8e3cff; text-decoration: none;">{{reply_to}}</a></div>
        </div>

        <div class="field">
            <span class="label">Subject:</span>
            <div class="value">{{subject}}</div>
        </div>

        <div class="field">
            <span class="label">Message:</span>
            <div class="message-box">
                {{message}}
            </div>
        </div>

        <div style="text-align: center;">
            <a href="mailto:{{reply_to}}" class="reply-button">Reply to {{from_name}}</a>
        </div>

        <div class="footer">
            <p>This message was sent from your portfolio contact form</p>
            <p>Received: {{reply_to}} • hyemindoo.com</p>
        </div>
    </div>
</body>
</html>
```

#### **Template Settings:**
- **From Name**: `{{from_name}}` (Portfolio Visitor)
- **Reply To**: `{{reply_to}}` (The sender's email)
- **To Email**: `dannydoo1234@gmail.com` (Your email - can be set in service or template)

#### **Variables Used:**
- `{{from_name}}` - Name of the person contacting you
- `{{reply_to}}` - Email address of the person contacting you
- `{{subject}}` - Subject line they provided
- `{{message}}` - The message body

## Step 4: Get Your Public Key
1. Go to **Account** → **General**
2. Find your **Public Key** (looks like: `aBcD1234eFgH5678`)
3. Copy this key

## Step 5: Update Your Website
1. Open `index.html`
2. Find line 15: `emailjs.init("YOUR_PUBLIC_KEY");`
3. Replace `YOUR_PUBLIC_KEY` with your actual public key
4. Open `script.js`
5. Find line 264: `emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', contactForm)`
6. Replace:
   - `YOUR_SERVICE_ID` with your Service ID from Step 2
   - `YOUR_TEMPLATE_ID` with your Template ID from Step 3

### Example:
```javascript
// Before:
emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', contactForm)

// After:
emailjs.sendForm('service_abc1234', 'template_xyz5678', contactForm)
```

## Step 6: Test Your Form
1. Open your website
2. Fill out the contact form
3. Submit it
4. Check your email inbox (`dannydoo1234@gmail.com`)
5. You should receive a beautifully formatted email with the contact details

## Email Preview
Your emails will look like this:
- **Header**: Purple gradient banner with "📧 New Portfolio Contact"
- **From Section**: Name of the sender in bold
- **Email Section**: Clickable email link
- **Subject Section**: Subject line they provided
- **Message Section**: Message in a light gray box with cyan border
- **Reply Button**: Purple button to quickly reply
- **Footer**: Timestamp and source information

## Troubleshooting
- **Not receiving emails?** Check your spam folder
- **Error messages?** Verify all IDs are correct in both `index.html` and `script.js`
- **Template not working?** Make sure all variable names match: `from_name`, `reply_to`, `subject`, `message`
- **Form not submitting?** Check browser console for errors and verify Public Key is set

## Free Tier Limits
- 200 emails per month
- Upgrade to paid plan if you need more

---

**Note**: Keep your Service ID, Template ID, and Public Key handy. You'll need them to complete the setup!
