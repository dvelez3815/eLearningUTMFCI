import React, { useEffect} from "react";

const ReCaptcha = () => {
    const handleLoaded = _ => {
        window.grecaptcha.ready(_ => {
          window.grecaptcha
            .execute("6Ld5YtYhAAAAABVw_YJl1gXtEBKvrs8OOx6jkwe8", { action: "homepage" })
            .then(token => {
              console.log(token)
            })
        })
      }

      useEffect(() => {
        // Add reCaptcha
        const script = document.createElement("script")
        script.src = "https://www.google.com/recaptcha/api.js?render=6Ld5YtYhAAAAABVw_YJl1gXtEBKvrs8OOx6jkwe8"
        script.addEventListener("load", handleLoaded)
        document.body.appendChild(script)
      }, [])
      return (
        <div
          className="g-recaptcha"
          data-sitekey="6Ld5YtYhAAAAABVw_YJl1gXtEBKvrs8OOx6jkwe8"
          data-size="invisible"
        >sssss</div>
      )
};


export default ReCaptcha;
