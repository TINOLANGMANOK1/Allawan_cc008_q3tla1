document.addEventListener('DOMContentLoaded', () => {


    const theForm = document.getElementById('registrationForm');

    if (theForm) {
        theForm.addEventListener('submit', (event) => {

            event.preventDefault();

            const passwordInput = document.getElementById('password').value;
            const confirmPasswordInput = document.getElementById('confirmPassword').value;

            if (passwordInput !== confirmPasswordInput) {
                alert('Passwords do not match. Please try again.');
                return;
            }

            const userConfirmed = confirm('Are you sure you want to submit your details?');

            if (userConfirmed) {
                let selectedGender;
                if (document.getElementById('male').checked) {
                    selectedGender = 'Male';
                } else if (document.getElementById('female').checked) {
                    selectedGender = 'Female';
                }

                const allData = {
                    firstName: document.getElementById('firstName').value,
                    middleName: document.getElementById('middleName').value,
                    lastName: document.getElementById('lastName').value,
                    dob: document.getElementById('dob').value,
                    birthLocation: document.getElementById('birthLocation').value,
                    gender: selectedGender,
                    civilStatus: document.getElementById('civilStatus').value,
                    nationality: document.getElementById('nationality').value,
                    religion: document.getElementById('religion').value,
                    contactNumber: document.getElementById('contactNumber').value,
                    email: document.getElementById('email').value,
                    homeAddress: document.getElementById('homeAddress').value,
                    emergencyName: document.getElementById('emergencyName').value,
                    emergencyRelationship: document.getElementById('emergencyRelationship').value,
                    emergencyNumber: document.getElementById('emergencyNumber').value,
                    username: document.getElementById('username').value,
                };

                const photoInput = document.getElementById('photo');
                const photoFile = photoInput.files[0];

                if (photoFile) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        allData.photoUrl = e.target.result;
                        sessionStorage.setItem('formData', JSON.stringify(allData));
                        window.location.href = 'output.html';
                    };
                    reader.readAsDataURL(photoFile);
                } else {
                    allData.photoUrl = null;
                    sessionStorage.setItem('formData', JSON.stringify(allData));
                    window.location.href = 'output.html';
                }
            }
        });
    }

    const outputDisplay = document.getElementById('outputContainer');

    if (outputDisplay) {
        const savedDataString = sessionStorage.getItem('formData');

        if (savedDataString) {
            const data = JSON.parse(savedDataString);

            const fullName = `${data.firstName} ${data.middleName} ${data.lastName}`;
            document.getElementById('outputFullName').textContent = fullName;

            if (data.photoUrl) {
                const image = document.createElement('img');
                image.src = data.photoUrl;
                document.getElementById('outputPhoto').appendChild(image);
            } else {
                document.getElementById('outputPhoto').textContent = 'No photo uploaded.';
            }

            document.getElementById('outputDob').textContent = data.dob || 'N/A';
            document.getElementById('outputBirthLocation').textContent = data.birthLocation || 'N/A';
            document.getElementById('outputGender').textContent = data.gender || 'N/A';
            document.getElementById('outputCivilStatus').textContent = data.civilStatus || 'N/A';
            document.getElementById('outputNationality').textContent = data.nationality || 'N/A';
            document.getElementById('outputReligion').textContent = data.religion || 'N/A';
            document.getElementById('outputContactNumber').textContent = data.contactNumber || 'N/A';
            document.getElementById('outputEmail').textContent = data.email || 'N/A';
            document.getElementById('outputHomeAddress').textContent = data.homeAddress || 'N/A';

            const emergencyInfo = `${data.emergencyName} (${data.emergencyRelationship}), ${data.emergencyNumber}`;
            document.getElementById('outputEmergencyContact').textContent = emergencyInfo;

            document.getElementById('outputUsername').textContent = data.username || 'N/A';

        }
    }
});