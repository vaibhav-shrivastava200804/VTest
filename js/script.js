let QuesNo=document.querySelectorAll(".QuesNo")
let next=document.querySelector("#next");
let prev=document.querySelector("#prev");
let Submit=document.querySelector("#Submit");
let ham=document.querySelector("#ham");
let details=document.querySelector(".details");
let question=document.querySelector(".question");
let closeBtn=document.querySelector(".closeBtn");
let warningContainer=document.querySelector(".warningContainer");
let message=document.querySelector("#message");
let leaveCount=0;


console.log(QuesNo);
let i=0;
let currQues=QuesNo[i];
console.log(i);
console.log(currQues);
currQues.style.backgroundColor="yellow";
Submit.style.display="none";


if (currQues==QuesNo[0]) {
    prev.style.display="none"
}


const form = document.querySelector(".Ques");
form.addEventListener("submit", (event) => {
    event.preventDefault();
});

next.addEventListener("click",()=>{
    prev.style.display="block";
    currQues.style.backgroundColor="#BFDBF7";
    i++;
    currQues=QuesNo[i];
    console.log(i);
    console.log(currQues);
    currQues.style.backgroundColor="yellow";
    if (i==QuesNo.length-1) {
        Submit.style.display="block";
        next.style.display="none";
    }
})
console.log(i);

prev.addEventListener("click",()=>{
    Submit.style.display="none";
    next.style.display="block"
    currQues.style.backgroundColor="#BFDBF7";
    i--;
    currQues=QuesNo[i];
    console.log(i);
    console.log(currQues);
    currQues.style.backgroundColor="yellow";
    if (currQues==QuesNo[0]) {
        prev.style.display="none"
    }
})

ham.addEventListener("click",()=>{
    if (details.style.display=="flex") {
        details.style.display="none";
        ham.src="images/hambirger.png"
    } else {
        details.style.display="flex";
        details.style.position="absolute";
        details.style.right="1px"
        details.style.height="90%"
        details.style.width="43%"
        ham.src="images/close.png"
    }
    
})
function visiChange() {
    if (document.visibilityState === "hidden") {
        leaveCount++;
        if (leaveCount==2) {
            /*alert("you have been disqualified");*/
            warningContainer.style.display="flex"
            message.innerHTML="You've been disqualified";
            prev.style.display="none";
            next.style.display="none";
            Submit.style.display="block";
        }
        else{
            /*alert("you can't leave window during test./n After one mopre try you'll be disqaulified");*/
            warningContainer.style.display="flex";
            closeBtn.addEventListener('click',()=>{
                warningContainer.style.display="none"
            })
        }
    }
}

document.addEventListener("visibilitychange", visiChange);

Submit.addEventListener("click",()=>{
    console.log("Form Submitted");
    document.removeEventListener("visibilitychange",visiChange)
    form.submit();
})

