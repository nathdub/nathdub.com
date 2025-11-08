<script lang="ts">
	import SevenSegDigit from '$lib/components/seven-seg-digit.svelte';
	import type { DigitSymbol } from '$lib/types';
	const display_size = 10;

	let currentOperand = $state('0');
	let previousOperand = $state('');
	let operator = $state<string | undefined>(undefined);

	let digits = $derived.by(() => {
		let to_display = currentOperand;
		const numberOfDigits = to_display.includes('.') ? to_display.length - 1 : to_display.length;

		if (numberOfDigits > display_size) {
			let num1 = to_display.includes('.') ? to_display.slice(0, to_display.indexOf('.')) : to_display;
			let num2 = to_display.includes('.') ? to_display.slice(to_display.indexOf('.') + 1) : '';
			let num3 = '';

			if (num1.length <= display_size) {
				// nombre trop précis
				let comma_precision = display_size - num1.length;
				num2 = num2.slice(0, comma_precision);
				// TODO faire système de report
				// num2 = parseInt(num2.charAt(comma_precision+1)) >= 5 ? toString(parseInt(num2.slice(0,comma_precision)) + 1) : num2.slice(0,comma_precision) ; // report éventuel, ça ne marche pas mais de toute façàon il y aurait un problème pour 999.999999999999 car ca prendrait 11 digits
				//to_display =
			} else {
				// nombre trop grand
				let exponent = num1.length - 1;
				num3 = `io${exponent}`; // io c'est le petit 10
				let expo_size = num3.length;
				if (expo_size >= display_size)
					to_display = 'ERROR'; // y'a plus la place pour mettre combien on multiplie par ioN (10^N)
				else {
					num2 = num1.slice(1, display_size - expo_size);
					num1 = num1.charAt(0);
				}
			}

			if (to_display !== 'ERROR') {
				if (num2) to_display = num1 + '.' + num2 + num3;
				else to_display = num1 + num3;
			}
		}

		// init output
		const output = Array(display_size)
			.fill(null)
			.map(() => ({ value: '' as DigitSymbol, dot: false, hideDot: false }));

		if (to_display.includes('.')) {
			let pos = to_display.indexOf('.');
			output[to_display.length - pos - 1]['dot'] = true;
			to_display = to_display.replace('.', '');
		}

		for (let digit = 0; digit < to_display.length; digit++) {
			output[digit].value = to_display[to_display.length - 1 - digit] as DigitSymbol;
		}

		output[0]['hideDot'] = true;

		return output;
	});

	function calculate() {
		const prev = parseFloat(previousOperand);
		const curr = parseFloat(currentOperand);
		let result;
		switch (operator) {
			case '+':
				result = prev + curr;
				break;
			case '-':
				result = prev - curr;
				break;
			case '*':
				result = prev * curr;
				break;
			case '/':
				if (curr === 0) {
					result = 'ERROR';
				} else {
					result = prev / curr;
				}
				break;
			default:
				result = curr;
				break;
		}
		currentOperand = result.toString();
		previousOperand = '';
		operator = undefined;
	}

	function reset() {
		currentOperand = '';
		previousOperand = '';
		operator = undefined;
	}

	function numberButton(key: string) {
		if (key === '.' && currentOperand.includes('.')) return;
		if (currentOperand === '0') {
			currentOperand = key;
		} else {
			currentOperand = currentOperand + key;
		}
	}

	function operatorButton(key: string) {
		if (currentOperand === '') {
			operator = key;
		} else {
			calculate();
			if (currentOperand === 'ERROR') {
				reset();
				currentOperand = '0';
			} else {
				previousOperand = currentOperand;
				currentOperand = '';
				operator = key;
			}
		}
	}

	function equalButton() {
		calculate();
		if (currentOperand === 'ERROR') {
			reset();
			currentOperand = '0';
		}
	}

	function clearButton() {
		reset();
	}

	function backButton() {
		currentOperand = currentOperand.slice(0, -1);
	}
</script>

<h1>Calculator</h1>

<div id="calculator">
	<div id="display">
		{#each digits.reverse() as digit}
			<SevenSegDigit value={digit.value} dot={digit.dot} hideDot={digit.hideDot} />
		{/each}
	</div>
	<!-- prettier-ignore -->
	<div class="buttons">
		<button onclick={clearButton} > C </button>
		<button onclick={backButton} > ← </button>
		<button onclick={()=>{operatorButton('/')}} > / </button>
		<button onclick={()=>{operatorButton('*')}} > * </button>

		<button onclick={()=>{numberButton('7')}} > 7 </button>
		<button onclick={()=>{numberButton('8')}} > 8 </button>
		<button onclick={()=>{numberButton('9')}} > 9 </button>
		<button onclick={()=>{operatorButton('-')}}> - </button>

		<button onclick={()=>{numberButton('4')}}> 4 </button>
		<button onclick={()=>{numberButton('5')}}> 5 </button>
		<button onclick={()=>{numberButton('6')}}> 6 </button>
		<button onclick={()=>{operatorButton('+')}} > + </button>

		<button onclick={()=>{numberButton('1')}}> 1 </button>
		<button onclick={()=>{numberButton('2')}}> 2 </button>
		<button onclick={()=>{numberButton('3')}}> 3 </button>
		<button onclick={equalButton} class="tall-btn"> = </button>

		<button onclick={()=>{numberButton('0')}}> 0 </button>
		<button onclick={()=>{numberButton('69')}}> 69 </button>
		<button onclick={()=>{numberButton('.')}}> . </button>
	</div>
</div>

<style>
	#calculator {
		width: 100%;
		max-width: 30rem;
		aspect-ratio: 1;

		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 5px;

		padding: 10px;
		box-sizing: border-box;

		background: floralwhite;
		border: 1px black solid;
		border-radius: 1rem;
		box-shadow: 0 0 20px grey;
	}

	#display {
		flex: none;
		height: 14%;
		background-color: black;
		display: flex;
		padding: 0.5rem;

		border-radius: 0.5rem;
	}

	.buttons {
		flex: 1;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr; /* 1 fraction */
		grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
		gap: 5px;
	}

	.tall-btn {
		grid-row: span 2;
	}

	.wide-btn {
		grid-column: span 2;
	}

	button {
		border-radius: 1rem;
		border: 0.1rem solid grey;
		cursor: pointer;
		background: ghostwhite;
		translate: 0 -5px;
		box-shadow: 0 5px black;
		transition: ease-in-out 0.1s;
		color: black;
	}

	button:active {
		box-shadow: none;
		translate: 0;
	}
</style>
