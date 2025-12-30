const http = require("http");

const API_URL = process.env.API_URL || "http://localhost:5000";

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
};

function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, API_URL);
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const req = http.request(url, options, (res) => {
      let body = "";
      res.on("data", (chunk) => {
        body += chunk;
      });
      res.on("end", () => {
        try {
          const parsed = body ? JSON.parse(body) : {};
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function testEndpoint(name, method, path, data = null) {
  try {
    const result = await makeRequest(method, path, data);
    const success = result.status >= 200 && result.status < 300;
    const icon = success ? "✅" : "❌";
    const color = success ? colors.green : colors.red;

    console.log(
      `${color}${icon} ${name}${colors.reset} - Status: ${result.status}`
    );
    if (!success) {
      console.log(`   Error: ${JSON.stringify(result.data).substring(0, 100)}`);
    }
    return success;
  } catch (error) {
    console.log(`${colors.red}❌ ${name}${colors.reset} - Error: ${error.message}`);
    return false;
  }
}

async function runTests() {
  console.log(`${colors.blue}🧪 Testing Omoja Backend Endpoints${colors.reset}\n`);
  console.log(`API URL: ${API_URL}\n`);

  const results = [];

  // Health check
  results.push(
    await testEndpoint("Health Check", "GET", "/api/health")
  );

  // Root endpoint
  results.push(await testEndpoint("Root Endpoint", "GET", "/"));

  // Auth endpoints (will fail without proper data, but should return proper errors)
  results.push(
    await testEndpoint(
      "Register (validation test)",
      "POST",
      "/api/auth/register",
      { email: "test" } // Invalid data to test validation
    )
  );

  results.push(
    await testEndpoint(
      "Login (validation test)",
      "POST",
      "/api/auth/login",
      {} // Invalid data to test validation
    )
  );

  // Categories (public endpoint)
  results.push(await testEndpoint("Get Categories", "GET", "/api/categories"));

  // 404 test
  results.push(
    await testEndpoint("404 Test", "GET", "/api/nonexistent")
  );

  // Summary
  const passed = results.filter((r) => r).length;
  const total = results.length;

  console.log(`\n${colors.blue}📊 Test Summary:${colors.reset}`);
  console.log(
    `${colors.green}✅ Passed: ${passed}/${total}${colors.reset}`
  );

  if (passed === total) {
    console.log(
      `\n${colors.green}🎉 All tests passed! Backend is ready.${colors.reset}`
    );
  } else {
    console.log(
      `\n${colors.yellow}⚠️  Some tests failed. Check server logs.${colors.reset}`
    );
  }
}

// Run tests
runTests().catch(console.error);


