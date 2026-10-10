let globalMealName = ""; // משתנה גלובלי לשמירת שם המנה שבחרנו
let globalMealImage = ""; // משתנה גלובלי לשמירת הנתיב לתמונה של המנה שבחרנו

// פונקציה שבודקת האם למשתמש מותר ללחוץ על הכפתור שליחה
 function checkValidation() {
let name = document.getElementById("childName").value; // שומר את מה שהוקלד בתיבת השם בתוך משתנה
//  תנאי שבודק שהשם לא ריק לאחר ניקוי רווחים מיותרים (trim) וגם המנה העיקרית נבחרה
if (name.trim() !='' && globalMealName !='') {
//  שימוש בערך  false כדי לשחרר את הכפתור
document.getElementById("submitBtn").disabled = false; 
} else {
//שימוש בערך  true כדי לנעול את הכפתור בצורה תקנית
document.getElementById("submitBtn").disabled = true; 
}
}

// פונקציה שמופעלת כשבוחרים מנה עיקרית
function changeMainImage(mealName, mealImg) {
    // מסתירים את כל 3 תמונות המנות העיקריות כדי לנקות את התצוגה
    document.getElementById("img-burger").style.display = "none";
    document.getElementById("img-nuggets").style.display = "none";
    document.getElementById("img-schnitzel").style.display = "none";

    // בדיקה: איזו מנה המשתמש בחר? לפי זה נציג חזרה את התמונה המתאימה
    if (mealName == "המבורגר") {
        document.getElementById("img-burger").style.display = "inline-block"; 
    }
    if (mealName == "נאגטס") {
        document.getElementById("img-nuggets").style.display = "inline-block";
    }
    if (mealName == "אצבע שניצל תירס") {
        document.getElementById("img-schnitzel").style.display = "inline-block";
    }

    globalMealName = mealName; // מעדכנים את המשתנה הגלובלי בשם המנה שנבחרה
    globalMealImage = mealImg; // מעדכנים את המשתנה הגלובלי בנתיב התמונה של המנה שנבחרה

    checkValidation(); // קוראים לפונקציה שבודקת אם אפשר עכשיו לאפשר את הלחיצה על "שלח הזמנה"
}

// פונקציה שמופעלת שלוחצים על תוספת או שתייה
function toggleExtraImg(imageId) {
    let currentClass = document.getElementById(imageId).className;

    // בודקים אם התמונה כרגע מוגדרת כחצי שקופה 
    if (currentClass == "dimmed-img side-img") {
        // אם כן, מחליפים לה את העיצוב לצבע מלא ואטום ("active-img side-img")
        document.getElementById(imageId).className = "active-img side-img";
    } else {
        // אם היא כבר הייתה אטומה, מחזירים אותה למצב חצי שקוף
        document.getElementById(imageId).className = "dimmed-img side-img";
    }
}

// הפונקציה הראשית שמופעלת בלחיצה על כפתור השליחה
function submitForm() {
    let name = document.getElementById("childName").value; // לוקחים שוב את שם הלקוח לצורך יצירת המשפט המסכם

    let selectedExtrasNames = []; // מערך לאיסוף השמות של התוספות שנבחרו
    let selectedExtrasImages = [];// מערך לאיסוף הנתיבים של התמונות שנבחרו
    let indexOftheArray = 0;
// יצירת מערך שמכיל אובייקטים עם כל התוספות והשתייה שלנו 
    let extrasList = [
        { id: "cbSalad", img: "images/salad.png" },
        { id: "cbFries", img: "images/fries.png" },
        { id: "cbWedges", img: "images/wedges.png" },
        { id: "cbOnion", img: "images/onion.png" },
        { id: "cbCola", img: "images/cola.png" },
        { id: "cbWater", img: "images/water.png" },
        { id: "cbApple", img: "images/apple.png" },
        { id: "cbGrape", img: "images/grape.png" }
    ];

    // לולאה שעוברת על כל הפריטים ברשימה שיצרנו למעלה
    for (let i = 0; i < extrasList.length; i++) {
        let currentCheckbox = document.getElementById(extrasList[i].id); 

        if (currentCheckbox.checked) { 
            selectedExtrasNames[indexOftheArray] = currentCheckbox.value; 
            selectedExtrasImages[indexOftheArray] = extrasList[i].img;
            indexOftheArray++;
        }
    }

    // מתחילים להרכיב מחרוזת של טקסט עם הסיכום
    let finalMessage = "ההזמנה של " + name + " התקבלה!<br><br>"; 
    finalMessage += "<b>מנה עיקרית:</b> " + globalMealName + "<br>"; 

    if (selectedExtrasNames.length > 0) { // בודק האם המערך לא ריק (כלומר, האם נבחרה לפחות תוספת אחת)
        finalMessage += "<b>תוספות ושתייה:</b> ";
        for (let i = 0; i < selectedExtrasNames.length; i++) { // רץ בלולאה על כל התוספות שנאספו
            finalMessage += selectedExtrasNames[i]; // מוסיף לטקסט המסכם את התוספת הנוכחית

            if (i < selectedExtrasNames.length - 1) { // בודק האם אנחנו עוד לא בתוספת האחרונה
                finalMessage += ", "; // אם לא האחרונה, מוסיף פסיק ורווח כדי להפריד בין התוספות
            }
        }
    } else {
        finalMessage += "<b>תוספות ושתייה:</b> לא נבחרו."; // אם המערך היה ריק, מציג הודעה מתאימה
    }
    
    // בונה מחרוזת שנייה שמכילה קוד HTML של תמונות כדי להציג את הנבחרות בחלון הקופץ
    let imagesHtml = "<img src='" + globalMealImage + "' class='modal-main-img'>";
    for (let j = 0; j < selectedExtrasImages.length; j++) { // רץ בלולאה על מערך התמונות שאספנו
        imagesHtml += "<img src='" + selectedExtrasImages[j] + "' class='side-img'>"; // משרשר תגית img עבור כל נתיב
    }

    /// לוקח את המחרוזות שהכנו ומביא אותן לתוך האזורים המתאימים בחלון הקופץ שב-HTML 
    document.getElementById("modalText").innerHTML = finalMessage;
    document.getElementById("modalImages").innerHTML = imagesHtml;

    // מציג את החלון הקופץ על ידי שינוי ה-display ל-block 
    document.getElementById("modalOverlay").style.display = "block";
}

// פונקציה שסוגרת (מעלימה) את החלון הקופץ בלחיצה על "סגור חלון"
function closeModal() {
    document.getElementById("modalOverlay").style.display = "none";
}