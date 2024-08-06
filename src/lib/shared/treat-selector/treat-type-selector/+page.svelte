<script lang='ts'>
    import { treats, type Treat } from "$lib/shared/treat-selector/treat";
    import { createEventDispatcher } from "svelte";

    
    let selectedTreat: Treat|undefined;
    let menuOpen = false;

    const dispatch = createEventDispatcher();

    function select(newTreat: Treat) {
        selectedTreat = newTreat;
        dispatch('selected', {
            treat: selectedTreat
        });
    }

</script>


<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-missing-attribute -->
<a on:click={() => menuOpen = !menuOpen}>{selectedTreat?.name || 'Select treat'}</a>

{#if menuOpen}
    <div>
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        {#each treats as treat}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div on:click={() => select(treat)}>{treat.name}</div>
        {/each}
    </div>
{/if}

