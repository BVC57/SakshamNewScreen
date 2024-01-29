const inputs = document.querySelectorAll("input"),
  button = document.querySelector("button");

// Function to get the OTP values
function getOTP() {
  const eotp = Array.from(inputs)
    .map((input) => input.value.trim())
    .join("");
  return eotp;
}

// Function to update button text
function updateButtonText() {
  const allInputsFilled = Array.from(inputs).every(
    (input) => input.value.trim() !== ""
  );
  button.textContent = allInputsFilled ? "Verify OTP" : "Enter OTP";
}

// Add event listener to the Verify OTP button
button.addEventListener("click", (e) => {
  e.preventDefault();

  // Check if all inputs have values
  const allInputsFilled = Array.from(inputs).every(
    (input) => input.value.trim() !== ""
  );

  if (allInputsFilled) {
    const otpValue = getOTP(); // Get the OTP value
    VerifyOTP(otpValue); // Pass the OTP value to VerifyOTP function
  } else {
    alert("Please enter all values!"); // Display error message
  }
});

inputs.forEach((input, index1) => {
  input.addEventListener("keyup", (e) => {
    const currentInput = input,
      nextInput = input.nextElementSibling,
      prevInput = input.previousElementSibling;

    if (currentInput.value.length > 1) {
      currentInput.value = "";
      return;
    }

    if (
      nextInput &&
      nextInput.hasAttribute("disabled") &&
      currentInput.value !== ""
    ) {
      nextInput.removeAttribute("disabled");
      nextInput.focus();
    }

    if (e.key === "Backspace") {
      inputs.forEach((input, index2) => {
        if (index1 <= index2 && prevInput) {
          input.setAttribute("disabled", true);
          input.prevInput = "";
          prevInput.focus();
        }
      });
    }

    if (!inputs[5].disabled && inputs[5].value !== "") {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }

    // Update button text dynamically
    updateButtonText();
  });
});

// Focus the first input which index is 0 on window load
window.addEventListener("load", () => {
  inputs[0].focus();
  updateButtonText(); // Update button text on window load
});

// Function to make the API call
async function VerifyOTP(otp) {
  console.log(otp);
  const apiUrl =
    "https://huf6ubili4.execute-api.ap-south-1.amazonaws.com/DEV/viewer_otp_verification";
  const method = "POST";
  const requestBody = {
    id: 1,
    OTP: otp,
  };
  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwNjUyOTMzOSwianRpIjoiODk1YWUzYWQtYjVlZS00YWIwLThkM2QtODFjYjNlYWE2ZDQzIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImUyMWRiMmZhLWI3ZjctNDIxYy04NTVkLWM5MTNlNjI0ZGFkNSIsIm5iZiI6MTcwNjUyOTMzOSwiZXhwIjoxNzA2NTMyOTM5fQ.AXBgdJc2uCghjfj3H28KSKGi0FIyKnsan0zj5Fxie6g";
  const requestOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token, // Move Authorization header here
    },
    body: JSON.stringify(requestBody),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);
    console.log("Response Status:", response.status);
    const data = await response.json();
    console.log("api data ", data);

    // Handle the API response as needed
    if (data.Status_Code === 200) {
      alert("API Response: " + JSON.stringify(data.message));
      window.location.href = "newinfo.html";
    } else if (data.Status_Code === 400) {
      alert(
        "API Response: " + JSON.stringify(data.message)
        );
        window.location.reload();
    } else if (data.Status_Code === 500) {
      alert(
        "API Response: " + JSON.stringify(data.message)
      );
      window.location.reload();
    } 
    else {
      alert("API Request Failed! API Error: " + JSON.stringify(data));
      window.location.reload();
    }
  } catch (error) {
    console.error("Error during API call:", error);
    alert(
      "An error occurred during the API call. Check the console for more details."
    );
    console.log("Request:", requestOptions);
    console.log("Error Response:", error);
  }
}



// pass the userid in the url

// Assume userId is the user ID you want to pass
// var userId = 123;

// // Redirect to the next page with userId in the URL
// window.location.href = 'receiver.html?userId=' + userId;


// get the user id from url in next page

{/* <script>
        // Retrieve the userId from the URL parameters
        var urlParams = new URLSearchParams(window.location.search);
        var userId = urlParams.get('userId');

        // Use the userId as needed
        console.log("User ID:", userId);
</script> */}