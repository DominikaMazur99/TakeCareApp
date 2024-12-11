import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: {
                "language.pl": "Polish",
                "language.en": "English",
                "menu.home": "Home",
                "menu.online": "Online Visits",
                "menu.homeVisits": "Home Visits",
                "menu.stationary": "Stationary Visits",
                "menu.secondOpinion": "Second Opinion",
                "menu.activityLog": "Activity Log",
                "menu.specialistCalendar": "Specialist Calendar",
                "menu.reports": "Reports",
                "menu.settings": "Settings",
                "menu.faq": "FAQ",
                "menu.logout": "Logout",
                "visit.number": "Issue Number",
                "visit.type": "Visit Type",
                "visit.specialization": "Specialization",
                "visit.date": "Visit Date",
                "visit.topic": "Topic",
                "visit.section": "Visit",
                "visit.additionalInfo": "Additional Information",
                "patient.country": "Country",
                "patient.age": "Patient Age",
                "patient.details": "Patient Details",
                "patient.symptoms": "Symptoms",
                "patient.address": "Address Details",
                "button.problem": "Register a problem",
                "button.appointment": "Book a visit",
                "patient.patient": "Patient",
                "patient.name": "First Name",
                "patient.surname": "Last Name",
                "patient.symptoms.label": "Symptoms",
                "document.type": "Document",
                "document.pesel": "PESEL",
                "document.passport": "Passport",
                "patient.pesel.placeholder": "Enter PESEL number",
                "patient.passport.placeholder": "Enter passport number",
                "patient.birthdate.placeholder": "Birth date",
                "patient.street.placeholder": "Street",
                "patient.local.placeholder": "Apartment number",
                "visit.address.label": "Address Details",
                "visit.differentAddress.label": "Visit at a different address",
                "visit.address2.label": "Address Details (2)",
                "visit.number.placeholder": "Enter issue number",
                "visit.date.placeholder": "Select visit date",
                "visit.hoursRange.label": "Select a specific time range",
                "visit.hours": "Time",
                "visit.hours.from": "From",
                "visit.hours.to": "To",
                "visit.topic.placeholder": "Select from the list",
                "visit.additionalInfo.placeholder": "Describe the problem",
                "visit.language": "Visit Language",
                "visit.language.placeholder": "Select from the list",
                "field.required": "This field is required.",
                "visit.specialization.placeholder": "Choose from list",
                "list.placeholder": "Choose from a list",
                "option.placeholder": "Choose an option",
                "btn.patient": "Add a patient",
                "btn.next": "Next",
                "form.header.book": "Visit booking",
                "home.visits": "Home visits",
                "go.to": "Go to",
                "patient.adult": "Adult",
                "patient.child": "Child",
                "validation.required": "This field is required.",
                "validation.pesel.length":
                    "PESEL number must consist of 11 digits.",
                "validation.pesel.checksum": "Invalid PESEL checksum.",
                "validation.idCard.format":
                    "ID card number must be in the format 3 letters + 6 digits (e.g., ABC123456).",
                "validation.idCard.checksum": "Invalid ID card checksum.",
                "validation.birthDate":
                    "Birth date must be valid and cannot be in the future.",
                "validation.visitDateRange":
                    "Select a date within today and the next 3 days.",
                "validation.timeRange":
                    "'To' time must be later than 'From' time.",
                "validation.minPacient": "Add at least one patient.",
                "loading.message": "Loading...",
                "alert.patient": "You can add 6 patients maximum!",
            },
        },
        pl: {
            translation: {
                "language.pl": "Polski",
                "language.en": "Angielski",
                "menu.home": "Strona główna",
                "menu.online": "Wizyty online",
                "menu.homeVisits": "Wizyty domowe",
                "menu.stationary": "Wizyty stacjonarne",
                "menu.secondOpinion": "Druga opinia",
                "menu.activityLog": "Dziennik aktywności",
                "menu.specialistCalendar": "Kalendarz specjalistów",
                "menu.reports": "Raporty",
                "menu.settings": "Ustawienia",
                "menu.faq": "FAQ",
                "menu.logout": "Wyloguj się",
                "visit.number": "Numer zgłoszenia",
                "visit.type": "Rodzaj wizyty",
                "visit.specialization": "Specjalizacja",
                "visit.date": "Data wizyty",
                "visit.topic": "Temat",
                "visit.section": "Wizyta",
                "visit.additionalInfo": "Dodatkowe informacje",
                "patient.country": "Kraj",
                "patient.age": "Wiek pacjenta",
                "patient.details": "Dane pacjenta",
                "patient.symptoms": "Objawy",
                "patient.address": "Dane adresowe",
                "button.problem": "Zgłoś problem",
                "button.appointment": "Umów wizytę",
                "patient.patient": "Pacjent",
                "patient.name": "Imię",
                "patient.surname": "Nazwisko",
                "patient.symptoms.label": "Objawy",
                "document.type": "Dokument",
                "document.pesel": "PESEL",
                "document.passport": "Paszport",
                "patient.pesel.placeholder": "Wpisz numer PESEL",
                "patient.passport.placeholder": "Wpisz numer paszportu",
                "patient.birthdate.placeholder": "Data urodzenia",
                "patient.street.placeholder": "Ulica",
                "patient.local.placeholder": "Numer lokalu",
                "visit.address.label": "Dane adresowe",
                "visit.differentAddress.label":
                    "Wizyta ma się odbyć na inny adres",
                "visit.address2.label": "Dane adresowe (2)",
                "visit.number.placeholder": "Wpisz numer zgłoszenia",
                "visit.date.placeholder": "Wybierz datę wizyty",
                "visit.hoursRange.label":
                    "Wybierz konkretny przedział godzinowy",
                "visit.hours": "Godzina",
                "visit.hours.from": "Od",
                "visit.hours.to": "Do",
                "visit.topic.placeholder": "Wybierz z listy",
                "visit.additionalInfo.placeholder": "Opisz problem",
                "visit.language": "Język wizyty",
                "visit.language.placeholder": "Wybierz z listy",
                "field.required": "To pole jest wymagane.",
                "visit.specialization.placeholder": "Wybierz z listy",
                "list.placeholder": "Wybierz z listy",
                "option.placeholder": "Wybierz opcję",
                "btn.patient": "Dodaj pacjenta",
                "btn.next": "Dalej",
                "form.header.book": "Umawianie wizyty",
                "home.visits": "Wizyty domowe",
                "go.to": "Przejdź do",
                "patient.adult": "Dorosły",
                "patient.child": "Dziecko",
                "validation.required": "To pole jest wymagane.",
                "validation.pesel.length":
                    "Numer PESEL musi składać się z 11 cyfr.",
                "validation.pesel.checksum":
                    "Nieprawidłowa suma kontrolna numeru PESEL.",
                "validation.idCard.format":
                    "Numer dowodu musi mieć format 3 litery + 6 cyfr (np. ABC123456).",
                "validation.idCard.checksum":
                    "Nieprawidłowa suma kontrolna numeru dowodu osobistego.",
                "validation.birthDate":
                    "Data urodzenia musi być poprawna i nie może być z przyszłości.",
                "validation.visitDateRange":
                    "Wybierz datę w zakresie od dzisiaj do 3 dni.",
                "validation.timeRange":
                    "Godzina 'Do' musi być późniejsza niż 'Od'.",
                "validation.minPacient": "Dodaj co najmniej jednego pacjenta.",
                "loading.message": "Trwa ładowanie...",
                "alert.patient": "Możesz dodać maksymalnie 6 pacjentów!",
            },
        },
    },
    lng: "pl", // Domyślny język
    fallbackLng: "en",
    interpolation: {
        escapeValue: false, // React automatycznie escapuje
    },
});

export default i18n;
