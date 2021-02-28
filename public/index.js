document.addEventListener("DOMContentLoaded", (e) => {
    const wrapperWord = document.querySelector(".wrapper-text");
    const bottomMenu = document.querySelector(".bottom-menu");
    const submitButton = document.getElementById("submit-button");
    const wrapperTextArea = document.querySelector(".textarea-wrapper");
    const textArea = document.getElementById("textarea");
    const word = document.getElementById("word");
    const word2 = document.getElementById("word");
    const restart = document.getElementById("restart");
    const speed = document.getElementById("speed");
    const form = document.getElementById("form");


    form.addEventListener("formdata", (e) => {
        e.preventDefault();

        let data = e.formData;
        for (var value of data.values()) {
          console.log(value);
        }
        const headers = {
            'Content-Type': 'application/json',
          }

        const sendGetRequest = async () => {
            try {
            const resp = await axios.post('http://localhost:5000/upload', data, {
                headers: headers
            })
            console.log(resp)
            }
            catch(e){
            console.log(e)
            }
            return false

       }

     sendGetRequest();

    })

    form.addEventListener("submit",  (e) => {
        e.preventDefault();
        new FormData(form);
        return false;

    })


    let timeout = undefined;
    let values = [];
    let actualSpeed = speed.value;



    submitButton.addEventListener("click", () => {
        values = textArea.value.split(' ');
        bottomMenu.style.display = "flex"
        wrapperWord.style.display = "flex";
        wrapperTextArea.style.display = "none";

        return assignNewValueToPTag(values, word);

    });

    let i = 0;
    const assignNewValueToPTag = (values, word) => {
        if (i < values.length) {
            word.innerHTML = values[i];
            i++;
            timeout = setTimeout(assignNewValueToPTag, actualSpeed, values, word)
            return timeout
        } else {
            return clearInterval(timeout);

        }
    }

    speed.addEventListener("click", () => {
        actualSpeed = speed.value;
    });

    restart.addEventListener("click", () => {
        clearInterval(timeout)
        word.innerHTML = word2;
        values = textArea.value.split(' ');
        i = 0;
        return assignNewValueToPTag(values, word);

    });

});
