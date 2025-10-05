$(document).ready(function () {
  $('#dtVerticalScrollExample').DataTable({
    "scrollY": "200px",
    "scrollCollapse": true,
  });
  $('.dataTables_length').addClass('bs-select');
});

$(document).ready(function () {
  $('#dtBasicExample').DataTable();
  $('.dataTables_length').addClass('bs-select');
});