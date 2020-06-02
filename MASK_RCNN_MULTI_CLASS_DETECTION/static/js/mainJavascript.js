$(document).ready(function () {
    // Init
    $('.image-section').hide();
    $('.loader').hide();
    $('#result').hide();
    $('#resultn').hide();

    // Upload Preview
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(function () {
        $('.image-section').show();
        $('#btn-predict').show();
        $('#result').text('');
        $('#result').hide();
        $('#resultn').text('');
        $('#resultn').hide();
        readURL(this);
    });

    // Predict
    $('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);

        // Show loading animation
        $(this).hide();
        $('.loader').show();

        // Make prediction by calling api /predict
        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                //var obj = JSON.stringify(data);
                var food = data.Food;
                var cal = data.Calories;
                var prob = data.Probability;
                var prot = data.Protein;
                var sugar = data.Sugar;
                var carbs =data.Carbhohydrate;
                var calc =data.Calcium;
                var iron =data.Iron;
                var chol = data.Cholesterol;
                var fibr = data.Fibre;
                // Get and display the result
                $('.loader').hide();
                $('#result').fadeIn(600);
                $('#resultn').fadeIn(600);
                $('#result').text(' Result:  ' + food +' Probability : '+prob);
                $('#resultn').text('Total Calories:  ' +cal);
                console.log('Success!');
      var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	theme: "light1",
	title:{
		text: "Other Nutrients",
		horizontalAlign: "center"
	},
	data: [{
		type: "doughnut",
		startAngle: 60,
		//innerRadius: 60,
		indexLabelFontSize: 17,
		indexLabel: "{label} - #percent%",
		toolTipContent: "<b>{label}:</b> {y} (#percent%)",
		dataPoints: [
		           { y:+prot, label: "Protein" },
	               { y:+sugar,  label: "Sugar" },
	               { y:+carbs,  label: "Carbohydrates" },
	               { y:+calc,  label: "Calcium" },
	               { y:+iron,  label: "Iron" },
	               { y:+chol,  label: "Cholesterol" },
	               { y:+fibr,  label: "Fiber" }
		]
	}]
});
chart.render();

                
            },
        });
    });

});






