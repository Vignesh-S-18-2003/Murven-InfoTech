let q1 = document.getElementById("q1");
let q2 = document.getElementById("q2");
let q3 = document.getElementById("q3");
let q4 = document.getElementById("q4");
let q5 = document.getElementById("q5");
let subtotal=document.getElementById("subtotal")
function add1() {
    q1.value = parseInt(q1.value) + 1;
    subtotal.value=parseInt(subtotal.value)+100;
}

function sub1() {
    if (parseInt(q1.value) > 0) {
        q1.value = parseInt(q1.value) - 1;
        
    subtotal.value=parseInt(subtotal.value)-100;
    }
}

function add2() {
    q2.value = parseInt(q2.value) + 1;
    
    subtotal.value=parseInt(subtotal.value)+120;
}

function sub2() {
    if (parseInt(q2.value) > 0) {
        q2.value = parseInt(q2.value) - 1;
        
    subtotal.value=parseInt(subtotal.value)-120;

    }
}

function add3() {
    q3.value = parseInt(q3.value) + 1;
    
    subtotal.value=parseInt(subtotal.value)+100;
}

function sub3() {
    if (parseInt(q3.value) > 0) {
        q3.value = parseInt(q3.value) - 1;
        
    subtotal.value=parseInt(subtotal.value)-100;
    }
}

function add4() {
    q4.value = parseInt(q4.value) + 1;
    
    subtotal.value=parseInt(subtotal.value)+110;
}

function sub4() {
    if (parseInt(q4.value) > 0) {
        q4.value = parseInt(q4.value) - 1;
        
    subtotal.value=parseInt(subtotal.value)-110;
    }
}

function add5() {
    q5.value = parseInt(q5.value) + 1;
    
    subtotal.value=parseInt(subtotal.value)+120;
}

function sub5() {
    if (parseInt(q5.value) > 0) {
        q5.value = parseInt(q5.value) - 1;
        
    subtotal.value=parseInt(subtotal.value)-120;
    }
}
var cartData;
function saveCart() {
 cartData = {
        q1: document.getElementById('q1').value,
        q2: document.getElementById('q2').value,
        q3: document.getElementById('q3').value,
        q4: document.getElementById('q4').value,
        q5: document.getElementById('q5').value,
        subtotal: document.getElementById('subtotal').value
    };
    localStorage.setItem('cartData', JSON.stringify(cartData));
    window.location.href = '/address.html';
}
                 

                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
