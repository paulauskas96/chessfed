document.addEventListener('DOMContentLoaded', function() {
    // Initially hide all tables
    document.querySelectorAll('.table').forEach(function(table) {
        table.style.display = 'none';
    });

    // Show table when corresponding button is clicked
    document.getElementById('button1').addEventListener('click', function() {
        document.querySelectorAll('.table').forEach(function(table) {
            table.style.display = 'none';
        });
        document.getElementById('tablepress-2-no-2_wrapper').style.display = 'block';
        document.querySelector('.table').style.display ='block'
    });
    document.getElementById('button2').addEventListener('click', function() {
        document.querySelectorAll('.table').forEach(function(table) {
            table.style.display = 'none'
        })
        document.getElementById('tablepress-3-no-2').style.display = 'block';
        document.querySelector('.table2').style.display = 'block'
    })
    // Repeat for the other buttons...
});