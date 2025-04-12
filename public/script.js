const elt = document.getElementById('calculator');
const calculator = Desmos.GraphingCalculator(elt, {showGrid: false, showXAxis: false, showYAxis: false});

fetch('watchModel.json')
    .then(response => response.json())
    .then(data => {
        calculator.setState(data);

        function calculateInitialN() {
            const now = new Date();
            const hour = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();
            console.log('Hour:', hour);
            console.log('Minutes:', minutes);
            console.log('Seconds:', seconds);

            return 1233.0752 - ((6.2832 * 60 * hour) + (6.2832 * minutes) + ((6.2832/60) * seconds));
        }

        let n = calculateInitialN();

        calculator.setExpression({ id: 'n', latex: `n=${n}` });

        setInterval(() => {
            n -= 0.020944;
            calculator.setExpression({ id: 'n', latex: `n=${n}` });
        }, 200);
    })
    .catch(error => {
        console.error('Error loading graph state:', error);
    });
