
<script>
    export let member;
    export let currency;
    export let i;
    export let calTotal;
    export let revCalTotal;
    export let removeMember;

    import { fade } from 'svelte/transition';

    console.log(member);
</script>
<style lang="scss">
	.teamMember {
		display: grid;
		grid-gap: 10px;
		grid-template-columns: 25% 25% auto;
		input[type=text],
		input[type=number]{
			width:100%;
		}
		.name{
			grid-column: 1/3;
			grid-row: 1;
		}
		.rate{
			 grid-column: 1;
			 grid-row: 2;
		 }
		.hours{
			 grid-column: 2;
			 grid-row: 2;
		 }
		.total{
			 grid-column: 3;
			 grid-row: 2;
		 }
	 .actions{
			 text-align: right;
			 button{
				 height: 25px;
				 width: 25px;
				 padding: 0px;
			 }
		 }
	}
</style>
<div class="box" transition:fade>
  <div class="teamMember">
    <div class="name">
      <label>
        Name
      </label>
      <input type=text bind:value={member.name}>
    </div>
    <div class="actions">
    <!--	<input type=checkbox/>-->
      <button on:click="{()=>removeMember(i)}">𝗫</button>

    </div>
    <div class="rate">
      <label>
        Rate ({#if currency == 1}${:else}¥{/if})
      </label>
      <input type=number bind:value={member.rate} on:input="{e => calTotal(i,e.target.value)}" step="1">
    </div>
    <div class="hours">
      <label>
          Hours (h)
      </label>
      <input type=number  bind:value={member.hours} on:input="{e => calTotal(i)}"  min="0">
    </div>
    <div class="total">
      <label>
        Total ({#if currency == 1}${:else}¥{/if})
      </label>
      <input type=number bind:value={member.total} on:input="{e => revCalTotal(i,e.target.value)}" min="0">
    </div>
  </div>
</div>
