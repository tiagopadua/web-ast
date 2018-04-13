import "../scss/ast.scss";

const AST_HOUR = 11;
const AST_MINUTE = 15;
const AST_SECONDS = ((AST_HOUR * 60) + AST_MINUTE) * 60;
const DAY_IN_SECONDS = 24 * 60 * 60;

function format_seconds(total_seconds) {
    let result = {
        hours: Math.abs(Math.floor(total_seconds / 3600)),
        minutes: Math.abs(Math.floor((total_seconds % 3600) / 60)),
        seconds: Math.abs((total_seconds % 3600) % 60)
    };
    return result.hours.toString().padStart(2, "0") + ":" + result.minutes.toString().padStart(2, "0") + ":" + result.seconds.toString().padStart(2, "0");
}

window.ast = new Vue({
    el: "#ast",
    data: {
        time: null
    },
    methods: {
        updateTime: function() {
            let now = new Date();
            let hour = now.getHours(),
                minute = now.getMinutes(),
                seconds = now.getSeconds();

            let total_seconds = ((hour * 60) + minute) * 60 + seconds;
            let difference = total_seconds - AST_SECONDS;

            if (difference > 0) {
                difference -= DAY_IN_SECONDS;
            }

            this.time = format_seconds(difference);
        }
    }
});

setInterval(() => window.ast.updateTime(), 1000);
