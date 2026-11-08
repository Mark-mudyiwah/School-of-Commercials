

function getFormData() {

    const studentName = document.getElementById('fullName').value.trim()

    const studentPhone = document.getElementById('phone').value.trim()

    const studentEmail = document.getElementById('email').value.trim()

    const studentEnquiry = document.getElementById('subject').value.trim()

    const studentMessage = document.getElementById('message').value.trim()

    return (
        {
            studentName,
            studentEmail,
            studentPhone,
            studentEnquiry,
            studentMessage
        }
    )

}

function validateFormData(formData) {

    if (!formData.studentName || formData.studentName.length < 6) {
        return ('Please provide your Name and Surname')
    }

    if (!formData.studentPhone || formData.studentPhone.length !== 10) {
        return ('Please provide  10 numbers')
    }


    if (!formData.studentEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.studentEmail)) {
        return 'Please provide a valid Email';
    }


    if (!formData.studentEnquiry) {
        return ('Please Select the reason for Enquiry')
    }


    if (!formData.studentMessage) {
        return ('Please provide some info about your enquiry in a few Words')
    }


    return null

}

const submitBtn = document.querySelector('.js-contact-submit-btn')

const formErrorSpan = document.querySelector('.js-error-note')

const originalErrorText = formErrorSpan.innerHTML

const form = document.getElementById('contactForm')

submitBtn.addEventListener('click',
    async (e) => {
        e.preventDefault()

        const formData = getFormData()
        const formError = validateFormData(formData)
        if (formError) {
            formErrorSpan.style.color = 'red'
            formErrorSpan.innerHTML = `
                <i class="fa-solid fa-warning"></i>
                ${formError}
         `
            return;
        }

        try {
            const response = await axios.post('https://formspree.io/f/mvzlrpqn', formData)

            if (response.status === 200) {
                formErrorSpan.style.color = 'green'
                formErrorSpan.style.fontWeight = '600'

                formErrorSpan.innerHTML = `
                Your Form was Submitted Successfully
                <i class="fa-solid fa-check"></i>
              `

                setTimeout(() => {
                    form.reset()

                    formErrorSpan.innerHTML = originalErrorText
                    formErrorSpan.style.color = ''
                    formErrorSpan.style.fontWeight = ''

                }, 3000)
            }


        } catch (error) {
            formErrorSpan.style.color = 'red'
            formErrorSpan.innerHTML = `Something went Wrong. Please try Again`
        }


    })