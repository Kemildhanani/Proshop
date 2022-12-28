
export const inputField = () => {
    const inputs = document.querySelectorAll(".input-tag");


    function addClass() {
        let parent = this.parentNode.parentNode;
        parent.classList.add("focus");
    }

    function removeClass() {
        let parent = this.parentNode.parentNode;
        if (this.value === "") {
            parent.classList.remove("focus");
        }
    }


    inputs.forEach(input => {
        if (input.nodeValue) {
            console.log(input);
            input.addEventListener("focus", addClass);
        }
        input.addEventListener("focus", addClass);
        input.addEventListener("blur", removeClass);
    });

}