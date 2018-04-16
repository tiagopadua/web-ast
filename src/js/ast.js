import "../scss/ast.scss";

const AST_HOUR = 11;
const AST_MINUTE = 15;
const AST_SECONDS = ((AST_HOUR * 60) + AST_MINUTE) * 60;
const DAY_IN_SECONDS = 24 * 60 * 60;

const AST_LENGTH = 60 * 60; // 60 minutes

function format_seconds(total_seconds) {
    let result = {
        hours: Math.abs(Math.floor(total_seconds / 3600)),
        minutes: Math.abs(Math.floor((total_seconds % 3600) / 60)),
        seconds: Math.abs((total_seconds % 3600) % 60)
    };
    return result.hours.toString().padStart(2, "0") + ":" + result.minutes.toString().padStart(2, "0") + ":" + result.seconds.toString().padStart(2, "0");
}

function ast_difference(hour, minute, second) {
    let total_seconds = ((hour * 60) + minute) * 60 + second;
    let difference = AST_SECONDS - total_seconds;

    if (difference < 0) {
        difference += DAY_IN_SECONDS;
    }

    return difference;
}

window.ast = new Vue({
    el: "#ast",
    data: {
        time: null,
        show_minus: true
    },
    methods: {
        updateTime: function() {
            let now = new Date();
            let hour = now.getHours(),
                minute = now.getMinutes(),
                second = now.getSeconds();

            let difference = ast_difference(hour, minute, second);

            if (difference === 0 || difference > (DAY_IN_SECONDS - AST_LENGTH)) {
                this.time = "Lunch time!";
                this.show_minus = false;
                return;
            }

            this.show_minus = true;
            this.time = format_seconds(difference);
        }
    }
});

setInterval(() => window.ast.updateTime(), 1000);
