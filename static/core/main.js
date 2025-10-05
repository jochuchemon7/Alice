$("#pop").on("click", function() {
    $("#imagepreview").attr("src", $("#imageresource").attr("src"));
    $("#imagemodel").modal("show");
});