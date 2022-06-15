<!--------------1. 기본예제----------------------------->
<!--App.svelte-->
<script>
	import MyComponent from './MyComponent.svelte';
	let name = 'svelte';
	let count = 0;
	function countUp() {
		count += 1;
	}
</script>
<h1>{name} study!! </h1>
<MyComponent/>
<h1> count {count}!!</h1>
<button on:click={countUp}>Count Up!!</button>

<!--MyComponent.svelte-->
<style>
	h1 {
	  background-color: green;
	  color: white;
	}
</style>
<h1>MyComponent</h1>

<!---------------------2. Declaring props: export------------------------>
<!--App.svelte-->
<script>
	import MyCard from './MyCard.svelte';
	let title = 'svelte';
		
</script>

<h1>오늘도 {title} study!! </h1>
<MyCard/>
<MyCard name="문주영"/>

<!--MyCard.svelte-->
<script>
	export let name = '유명가수'
</script>

<div class='card'>
	<h3>안녕하세요? {name}입니다.</h3>
</div>

<style>
 .card {
	 background-color: gray;
	 color: white;
	 padding: 20px;
	 margin-bottom: 10px;
	 border-radius: 25px;
	 width: 300px;
	 box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2)
 }
</style>

<!---------------------3. reactive stataement: $------------------------>
<!--App.svelte-->
<script>
	import ColorBox from './ColorBox.svelte'
	let color = '';	
</script>

<h1>입력한 색: {color}</h1>
<ColorBox title={color}/>
<input bind:value={color} type='text'>

<!--ColorBox.svelte-->
<script>
	export let title = '';

	let colors = {
		'빨강': 'red',
		'파랑': 'blue',
		'검정': 'black',
		'보라': 'purple',
		'초록': 'green'
	}

	$: bgColor = colors[title];
</script>

<style>
 .colorBox {
	color: white;
	padding: 20px;
	margin-bottom: 10px;
	width: 100px;
	text-align: center;
 }
</style>

<div class='colorBox' style='background-color: {bgColor}'>
	<h3>{bgColor}</h3>
</div>

<!---------------------4. slot------------------------>
<!--App.svelte-->
<script>
	import Container from './Container.svelte'
	import MyTextInput from './MyTextInput.svelte'
	let name = 'world';	
</script>

<Container>
	<h1>Hello {name}!</h1>
	<MyTextInput/>
</Container>

<!--Container.svelte-->
<header>
	<h2>header</h2>
</header>

<slot/>

<footer>
	<h2>footer</h2>
</footer>

<style>
	header {
		background-color: red;
		color: white;
		padding: 2px;
	}

	footer{
		background-color: blue;
		color: white;
		padding: 2px;
	}
</style>

<!--MyTextInput.svelte-->
<script>
  let userInput ="";
</script>

<h4>입력: {userInput}</h4>
<input bind:value={userInput} type="text">

<!---------------------5. Global CSS------------------------>
<!--App.svelte-->
<script>
	import MyComponent from './MyComponent.svelte'	
</script>

<style>
	:global(h2) {
		background-color: blue;
		color: white;
	}
</style>

<MyComponent/>
<h2>App Svelte</h2>

<!--MyComponent.svelte-->
<style>
	h3 {
	  background-color: red;
	  color: white;
	}
	
	.component {
		background-color: yellow;
		padding: 5px;
		margin: 10px;
	}
</style>

<div class="component">
	<h3>My Component h3</h3>
	<h2>My Component h2</h2>
</div>

<!---------------------5. If else------------------------>
<!--App.svelte-->
<script>
	let name = 'world';
	let count = 0;
	function countUp(){
		count += 1;
	}
	function resetCount(){
		count = 0;
	}
</script>

{#if count == 0}
	<h1>카운트가 0이다</h1>
{:else if 3 > count}
	<h1>카운트가 3보다 작다</h1>
{:else}
	<h1>카운트가 0이 아니다</h1>
{/if}

<h1>Count: {count}!</h1>
<button on:click={countUp}>Count Up</button>
<button on:click={resetCount}>Count Reset</button>

<!---------------------5. foreach------------------------>
<!--App.svelte-->
<script>
	let storedItems = [
		{ id: 0, name: "사과"},
		{ id: 1, name: "포도"},
		{ id: 2, name: "딸기"},
	];
	let items = storedItems;
	function clearItems(){
		items = [];
	}
	function restoreItems(){
		items = storedItems;
	}
</script>

<h1>장바구니</h1>
<button on:click={clearItems}>비우기</button>
<button on:click={restoreItems}>복구하기</button>
<ul>
	{#each items as aItems, i}
		<li>index: {i} - {aItems.name}</li>
	{:else}
		<li>장바구니가 비었습니다.</li>
	{/each}
</ul>