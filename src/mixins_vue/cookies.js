var cookies = {
    created: function () {
    },
    methods: {
        setCookie(value, expireTime){
            var now = new Date();
            var time = now.getTime();
            now.setTime(time + 100*expireTime*36000);
            document.cookie = value+';expires='+now.toGMTString()+';path=/';
            console.log(document.cookie);
        },
        getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i = 0; i <ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        },
        removeCookie(name){
            document.cookie = name+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        },
    }
};

export default cookies