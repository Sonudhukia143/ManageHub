export default function validateForm(validation, formData, setValidation) {
    let isValid = true;
    const newValidation = { ...validation };
    let hasChanges = false;

    // Email validation
    if (newValidation.gmail !== undefined) {
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.gmail);
        if (newValidation.gmail !== isEmailValid) {
            newValidation.gmail = isEmailValid;
            hasChanges = true;
        }
        if (!isEmailValid) isValid = false;
    }

    // Password validation (min 6 characters)
    if (newValidation.password !== undefined) {
        const isPasswordValid = formData.password.trim().length >= 6;
        if (newValidation.password !== isPasswordValid) {
            newValidation.password = isPasswordValid;
            hasChanges = true;
        }
        if (!isPasswordValid) isValid = false;
    }

    // Username validation
    if (newValidation.username !== undefined) {
        const isUsernameValid = formData.username.trim() !== "";
        if (newValidation.username !== isUsernameValid) {
            newValidation.username = isUsernameValid;
            hasChanges = true;
        }
        if (!isUsernameValid) isValid = false;
    }

    // Event Name Validation
    if (newValidation.eventname !== undefined) {
        const isEventNameValid = formData.eventname.trim() !== "";
        if (newValidation.eventname !== isEventNameValid) {
            newValidation.eventname = isEventNameValid;
            hasChanges = true;
        }
        if (!isEventNameValid) isValid = false;
    }

    // Event Start Date Validation (Must be at least 10 days from today)
    if (newValidation.eventstart !== undefined) {
        const eventStartDate = new Date(formData.eventstart);
        const minStartDate = new Date();
        minStartDate.setDate(minStartDate.getDate() + 10);

        const isEventStartValid = eventStartDate >= minStartDate;
        if (newValidation.eventstart !== isEventStartValid) {
            newValidation.eventstart = isEventStartValid;
            hasChanges = true;
        }
        if (!isEventStartValid) isValid = false;
    }

    // Event End Date Validation (Must be after event start date)
    if (newValidation.eventend !== undefined) {
        const eventEndDate = new Date(formData.eventend);
        const eventStartDate = new Date(formData.eventstart);

        const isEventEndValid = eventEndDate > eventStartDate;
        if (newValidation.eventend !== isEventEndValid) {
            newValidation.eventend = isEventEndValid;
            hasChanges = true;
        }
        if (!isEventEndValid) isValid = false;
    }

    // Event Description Validation
    if (newValidation.eventdescription !== undefined) {
        const isEventDescriptionValid = formData.eventdescription.trim() !== "";
        if (newValidation.eventdescription !== isEventDescriptionValid) {
            newValidation.eventdescription = isEventDescriptionValid;
            hasChanges = true;
        }
        if (!isEventDescriptionValid) isValid = false;
    }

    // Mode Validation (Online/Offline)
    if (newValidation.mode !== undefined) {
        const isModeValid = formData.mode.trim() !== "";
        if (newValidation.mode !== isModeValid) {
            newValidation.mode = isModeValid;
            hasChanges = true;
        }
        if (!isModeValid) isValid = false;
    }

    if (hasChanges) {
        setValidation(newValidation);
    }

    return isValid;
}
