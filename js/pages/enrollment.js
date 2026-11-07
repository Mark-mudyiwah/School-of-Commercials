
function getEnrollmentData() {

    const studentName = document.getElementById('studentName').value.trim()
    const studentAge = document.getElementById('studentAge').value.trim()
    const academicLevel = document.getElementById('studentLevel').value
    const currentSchool = document.getElementById('currentSchool').value.trim()

    const parentName = document.getElementById('parentName').value.trim()
    const contactNumber = document.getElementById('enrollmentPhone').value.trim()
    const email = document.getElementById('enrollmentEmail').value.trim()


    const enrollmentInterest = document.getElementById('enrollmentInterest').value.trim()
    const enrollmentSubjects = document.getElementById('enrollmentSubjects').value.trim()

    const enrollmentMessage = document.getElementById('enrollmentMessage').value.trim()

    const enrollmentConsent = document.getElementById('enrollmentConsent').value.trim()

    return (
        {
            studentName,
            studentAge,
            academicLevel,
            currentSchool,
            parentName,
            contactNumber,
            email,
            enrollmentInterest,
            enrollmentSubjects,
            enrollmentMessage,
            enrollmentConsent

        }


    )

}

function validateEnrollmentData(enrollmentData) {

    if (!enrollmentData.studentName || enrollmentData.studentName.length < 6) {
        return ('Please provide a full valid name and Surname')
    }

    if (!enrollmentData.studentAge || enrollmentData.studentAge < 12 || enrollmentData.studentAge > 30) {
        return ('Please provide an age between 12 and 30')
    }

    if (!enrollmentData.academicLevel) {
        return ('Please  Select your academic Level')
    }

    if (!enrollmentData.currentSchool || enrollmentData.currentSchool.length < 12) {
        return ('Please provide your Current School')
    }

    if (!enrollmentData.parentName || enrollmentData.parentName.length < 4) {
        return ("Please provide the parent or Guardian's name")
    }

    if (!enrollmentData.contactNumber || enrollmentData.contactNumber.length !== 10) {
        return ('Please provide  10 numbers')
    }

    if (!enrollmentData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enrollmentData.email)) {
        return 'Please provide a valid Email';
    }
    if (!enrollmentData.enrollmentInterest) {
        return ('Please select your interest ')
    }

    if (!enrollmentData.enrollmentSubjects) {
        return ('Please provide Subject(s) of interest')
    }

    if (!enrollmentData.enrollmentMessage) {
        return ('Please provide some info about your enquiry in a few Words')
    }


    return null
}


const submitBtn = document.querySelector('.js-enrollment-submit-btn')
submitBtn ?
    submitBtn.addEventListener('click', async (e) => {
        e.preventDefault()

        const enrollmentErrorSpan = document.querySelector('.js-enrollment-error-span')

        const enrollmentData = getEnrollmentData()

        const enrollmentError = validateEnrollmentData(enrollmentData)

        if (enrollmentError) {
            enrollmentErrorSpan.innerHTML = `
            <i class="fa-solid fa-warning"></i>
            ${enrollmentError}
        `
            return;
        }

        enrollmentErrorSpan.innerHTML = ''
        try {
            const response = await axios.post('https://formspree.io/f/mvzlrpqn', enrollmentData)
          
           
            console.log(response.data.status)

        } catch (error) {

            console.log(error)
        }




        // console.log(enrollmentData)

    })

    :

    console.log(' Submitt Button not Found')


