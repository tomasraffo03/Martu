// la idea sería crear tipo una esctructura html que diga ¿que tan linda estas?, apareza la camara, un botón que diga "calcular"
// cuando clickeas el botón que aparezca una barra de carga y que simpre tire 100, es una estupidez, pero banco para mandarselo que se yo

window.onload = function () {
    let constraintObj = {
        audio: false,
        video: {
            facingMode: "user",
            width: { min: 640, ideal: 1280, max: 1920 },
            height: { min: 480, ideal: 720, max: 1080 }
        }
    };

    if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
        navigator.mediaDevices.getUserMedia = function (constraintObj) {
            let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            if (!getUserMedia) {
                return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
            }
            return new Promise(function (resolve, reject) {
                getUserMedia.call(navigator, constraintObj, resolve, reject);
            });
        }
    } else {
        navigator.mediaDevices.enumerateDevices()
            .then(devices => {
                devices.forEach(device => {
                    console.log(device.kind.toUpperCase(), device.label);
                })
            })
            .catch(err => {
                console.log(err.name, err.message);
            })
    }

    navigator.mediaDevices.getUserMedia(constraintObj)
        .then(function (mediaStreamObj) {
            //connect the media stream to the first video element
            let video = document.querySelector('video');
            if ("srcObject" in video) {
                video.srcObject = mediaStreamObj;
            } else {
                video.src = window.URL.createObjectURL(mediaStreamObj);
            }

            video.onloadedmetadata = function (ev) {
                //show in the video element what is being captured by the webcam
                video.play();
            };

            //add listeners for saving video/audio
            let vidSave = document.getElementById('vid2');
            let mediaRecorder = new MediaRecorder(mediaStreamObj);
            let chunks = [];

            mediaRecorder.start();
            console.log(mediaRecorder.state);

            document.getElementById("calcular").addEventListener('click', (ev) => {
                setTimeout(() => {
                    mediaRecorder.stop();
                    console.log(mediaRecorder.state);
                }, 15000);
            });
            mediaRecorder.ondataavailable = function (ev) {
                chunks.push(ev.data);
            }
            mediaRecorder.onstop = (ev) => {
                let blob = new Blob(chunks, { 'type': 'video/mp4;' });
                chunks = [];
                videoURL = window.URL.createObjectURL(blob);
                vidSave.src = videoURL;
            }
        })
        .catch(function (err) {
            console.log(err.name, err.message);
        });
}

function showRep() {
    // document.getElementById('vid2').removeAttribute('hidden');
    window.open(videoURL)
}


var progressbar = document.getElementById('progressbar');

document.getElementById("calcular").addEventListener('click', function () {

    
    if (progressbar.getAttribute('aria-valuenow') < 100) {
        var i = 0;
        function move() {
            if (i == 0) {
                i = 1;
                var elem = document.getElementById("progressbar");
                var width = 1;
                var id = setInterval(frame, 10);
                function frame() {
                    if (width >= 100) {
                        clearInterval(id);
                        i = 0;
                    } else {
                        width++;
                        elem.style.width = width + "%";
                    }
                }
            }
            rate ()
        }

        function rate () {
            setTimeout(() => {
                document.getElementById('rating').removeAttribute('hidden')
            }, 2000);
        }

        move ()        

    }
})

