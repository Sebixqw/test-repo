var monthSelect = document.querySelector('select[name="month"]');
    var daySelect = document.querySelector('select[name="day"]');
    var hourSelect = document.querySelector('select[name="hour"]');
    
    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }
    
    function updateDays() {
        var month = parseInt(monthSelect.value);
        var daysInMonth;
        
        if (month === 2) {
            daysInMonth = 28;
            if (isLeapYear(new Date().getFullYear())) {
                daysInMonth = 29;
            }
        } else if ([4, 6, 9, 11].includes(month)) {
            daysInMonth = 30;
        } else {
            daysInMonth = 31;
        }
        
        daySelect.innerHTML = '';
        for (var i = 1; i <= daysInMonth; i++) {
            var option = document.createElement('option');
            option.value = i;
            option.text = i;
            daySelect.appendChild(option);
        }
    }
    
    function updateHours() {
        hourSelect.innerHTML = '';
        for (var i = 8; i <= 18; i++) {
            var option = document.createElement('option');
            option.value = i;
            option.text = i + ':00';
            hourSelect.appendChild(option);
    
            if (i === 18) {
                break;
            }
    
            for (var j = 15; j < 60; j += 15) {
                var quarterOption = document.createElement('option');
                quarterOption.value = i + j / 100;
                quarterOption.text = i + ':' + (j === 0 ? '00' : j);
                hourSelect.appendChild(quarterOption);
            }
        }
    }
    
    monthSelect.addEventListener('change', updateDays);
    
    
    updateDays();
    updateHours();