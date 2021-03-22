/*
*1.Custom upload value
*2.Custom upload button
*/

//1.Custom upload value
$('input[type="file"]').change(function(){
    var value = $("input[type='file']").val();
    if (value) $('.js-uploaded-file-value').text(value + ' Загружен').css({display: 'block', margin: '0 auto'});
});

//2.Custom upload button
function uploadFile() {
    const uploadBtn = document.querySelectorAll('')
    uploadBtn.forEach(function (elem) {
        elem.addEventListener('click', function () {
            this.previousElementSibling.click()
        })
    })
}
uploadFile()