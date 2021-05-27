<script>

	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import {defaultMembers} from './data.js';
	import TeamMember from './TeamMember.svelte';

	let members = defaultMembers;
	let cnyExchangeRate = 6.465198;
	let promise;
	let totalHours = 0
	let priceTotal = 0
	let hoursToWork = 0
	let teamRate = 0
	let targetBudget = 0;

	let currency = 1;
	let pct = 0; // or from an <input> field or whatever
	let escelate = 0;
	$:pctOutput = parseFloat(pct) / 100;
	let showExtraDetails = false;
	let shouldMarkup = false;
	let workDay = 8;


	function init(){
			for (let i = 0 ; i < members.length ; i++){
				calTotal(i);
			}
	}
	function revCalTotal(i,total) {
		if(shouldMarkup){
			let tempHours = members[i].hours * (1 + pctOutput);
			calTotal(i,members[i].rate,tempHours);
		}else{
			members[i].hours = total/members[i].rate;
		}
		calGrandTotal();
	}

	function calTotal(i,rate, hours) {
		if(!rate){
			rate = members[i].rate;
		}
		if(!hours){
			hours = members[i].hours;
		}
		members[i].total = rate * hours;
		calGrandTotal()
	}

	function calGrandTotal(){
		let tempPrice = 0;
		totalHours = 0;
		for (let k = 0 ; k < members.length ; k++){
			tempPrice += members[k].total;
			totalHours +=  members[k].hours;
			hoursToWork = totalHours;
		}
		priceTotal = Math.ceil(tempPrice);
		targetBudget = priceTotal
		calcTeamRate();
	}

	function calcTeamRate(){
		if(priceTotal){
			teamRate = Math.ceil(priceTotal/hoursToWork);
		}else{
			teamRate = 0;
		}
	}

	function addPercent(){
		for (let j = 0 ; j < members.length ; j++){
			revCalTotal(j,members[j].total)
		}
		/*
		for (let j = 0 ; j < members.length ; j++){
			let oldHour = members[j].hours;
			let oldPct = escelate;
			if(shouldMarkup && pct !== undefined){
				if(pct > escelate)
					members[j].adjustedHours = members[j].hours * (1 + pct);
				else if( pct < escelate)
					members[j].adjustedHours = members[j].hours * (1 - pct);
			}else{
				pct = 0;
			}

			//calTotal(j,members[j].rate,members[j].hours);

			//escelate = pct
		}
	*/
	}

	function changeCurrency(){
		updateExchangeRates();
		for (let k = 0 ; k < members.length ; k++){
			if(currency === 1){
				members[k].cnyRate = cnyExchangeRate * members[k].usdRate;
				members[k].usdRate = members[k].rate;
				members[k].rate = members[k].cnyRate;
			}else{
				members[k].cnyRate = members[k].rate;
				members[k].rate = members[k].usdRate;
			}
			calTotal(k,members[k].rate)
		}
	}
	function updateExchangeRates(){
		for (let k = 0 ; k < members.length ; k++){
			members[k].cnyRate = cnyExchangeRate * members[k].usdRate;
			if(currency === 2){
				members[k].rate = members[k].cnyRate;
			}else{
				members[k].usdRate = members[k].rate;
				members[k].rate = members[k].usdRate;
			}
			calTotal(k,members[k].rate);
		}
	}

	function clickExchange(){
		promise = getExchangeRate();
	}
	async function getExchangeRate() {
		const res = await fetch('https://free.currconv.com/api/v7/convert?q=USD_CNY&compact=ultra&apiKey=0ba689d6560753e2cb1d').then(response =>
    response.json().then(data => ({
        data: data,
        status: response.status
    })
		).then(res => {
	    console.log(res.status, res.data);
			if(res.status == 200){
				cnyExchangeRate = res.data.USD_CNY;
				updateExchangeRates();
			}else{
				alert('Issue with free.currconv.com - error: ' + res.status);
			}
		}));
	}

	function addEmptyMember() {
		let newMember = {
			name: 'NEW',
			rate: 36.00,
			usdRate: 36.00,
			cnyRate: 430.00,
			hours: 0,
			adjustedHours: 10
		}
		members = [...members, members.length + 1];
		members[members.length-1]=newMember;
		calTotal(members.length-1);
	}
	function removeMember(i){
		members=[
			...members.slice(0, i),
			...members.slice(i + 1, members.length)
		];
		calGrandTotal();
	}
let nightMode = false;
	function toggleNight(){
		if(nightMode === true)
			nightMode = false;
		else
			nightMode = true;

		window.document.body.classList.toggle('dark-theme')
	}

	const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

	if (prefersDarkScheme.matches) {
	  toggleNight()
	}
	init();
</script>
<style lang="scss">

	.dark-theme {
		.wrapper {
			background-color: #121212 !important;
			}
		}
	.details{
		display: grid;
    grid-gap: 10px;
    grid-template-columns: 55% auto;
	}

  .totals {
    grid-column: 1;
		grid-row: 1;
  }
  .exchange {
		text-align: right;
    grid-column: 2 ;
		grid-row: 1;
		.exchBtn{
			width: 8em;
		}
	}

	button.addNewMember{
		width:100%;
	}
	.saveIcon{
		float: right;
		padding: 0;
		width: 30px;
		text-align: center;
		margin-left: 10px;
	}
</style>
<div class="wrapper">
	<h3>Bid Details <button class="saveIcon" on:click={toggleNight}>{#if nightMode}☀️{:else}🌙{/if}</button><button class="saveIcon">💾</button><button class="saveIcon">🔄</button> </h3>
	<div class="details box">
		<div class="totals">
				<p>
					<label>
						Bid Total:
					</label>
					<strong>{#if currency == 1}${:else} ¥{/if}{priceTotal.toLocaleString()}</strong>
				</p>
				<p>
					<label>
						Team Rate:
					</label>
					 <strong>{#if currency == 1}${:else} ¥{/if}{teamRate.toLocaleString()}</strong>
				</p>
				<p>
					<label>
						Real Hours/Days:
					</label>
					<strong>{totalHours.toPrecision(4)}</strong> h - <strong>{(hoursToWork / workDay).toPrecision(3)}</strong> d
				</p>
				<input type=checkbox bind:checked={showExtraDetails} />
				{#if showExtraDetails}
				<p>
					<label>Billable Hours (h): </label>
					<input type=number bind:value={hoursToWork} on:input="{e=> calcTeamRate()}" size=4 />
				</p>
				<p>
					<label>
						Bid Target ({#if currency == 1}${:else}¥{/if}):
					</label>
					<input type=number bind:value={targetBudget} /> / {priceTotal}
				</p>
				<p>
					<label>
						Work Day (h):
					</label>
					<input type=number bind:value={workDay} min=1 />
				</p>
				<p>
					<label>Bid Time:</label>
					 {priceTotal/targetBudget} -- {1}
				</p>
				{/if}
		</div>
		<div class="exchange">
			<p>
			<label>
				<input type=radio bind:group={currency} value={1} on:input="{e=>changeCurrency()}">
				USD
				&nbsp;
				&nbsp;
				<input type=radio bind:group={currency} value={2} on:input="{e=>changeCurrency()}">
				CNY
				</label>
				<span alt="This will use the FreeCurrency API to get the latest USD to CNY rate (REFERENCE ONLY)">ℹ</span>
				<input type=number bind:value={cnyExchangeRate} disabled={currency==1 } on:input="{e => updateExchangeRates()}" size="7" min="0"/>
				<button class="exchBtn" disabled={currency==1 || promise} size="8" on:click="{()=>clickExchange()}">Get Exchange{#await promise}...{/await}</button>
			</p>
			<p>
				<label>
					<input type=checkbox  bind:checked={shouldMarkup} on:input="{e => addPercent()}" />	Escelate
				</label>
					<input type=number disabled={!shouldMarkup} bind:value={pct} on:input="{e => addPercent()}"  min="0" max="100"/> % 	{#if showExtraDetails}-- {pctOutput}- {100 * (1 + pctOutput)}{/if}
			</p>
		</div>
	</div>
	<h3>Team</h3>
	{#each members as member, i}
		<TeamMember member={member} i={i} currency={currency}
		calTotal={calTotal} revCalTotal={revCalTotal}
		removeMember={removeMember}></TeamMember>
		<br>
	{/each}
	<button class="addNewMember" on:click="{()=>addEmptyMember()}">+</button>
</div>
