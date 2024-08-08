<script lang='ts'>
    import { treats, type Treat } from "$lib/shared/treat-selector/treat";
    import Icon from '$lib/icons/+page.svelte';
    import { createEventDispatcher } from "svelte";

    
    let selectedTreat: Treat|undefined;
    let menuOpen = false;

    const dispatch = createEventDispatcher();

    function select(newTreat: Treat) {
        selectedTreat = newTreat;
        menuOpen = false;
        dispatch('selected', {
            treat: selectedTreat
        });
    }

</script>


<span class="fifi-dropdown-container">
    <div class="fifi-dropdown" class:open={menuOpen}>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-missing-attribute -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <a on:click={() => menuOpen = !menuOpen} style="--selected-option-text-color: {'white'}">
            {#if selectedTreat}
                <Icon name={selectedTreat.icon} size='22' color={'white'} />
            {/if}
            <span>{selectedTreat?.name || 'Select treat'}</span>
        </a>
        <div class="fifi-dropdown-content">
            {#each treats as treat}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <!-- svelte-ignore a11y-missing-attribute -->
                <span on:click={() => select(treat)}>
                    <Icon name={treat.icon} size='22' color='#0090E3' />
                    <a>{treat.name}</a>
                </span>
            {/each}
        </div>
    </div>
</span>

<style lang="scss">

    $selected-option-text-color: var(--selected-option-text-color);
    $dropdown-content-bg-color: #252525;
    $dropdown-option-text-color: white;
    $dropdown-option-hover-color: #101010;

    .fifi-dropdown-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .fifi-dropdown {
        position: relative;
    }

    .fifi-dropdown a {
        display: flex;
        align-items: center;
        color: $selected-option-text-color;
        border: none;
        cursor: pointer;

        text-decoration: underline;
        text-decoration-color: $selected-option-text-color;
        
        span {
            margin-left: 10px;
            margin-right: 5px;
        }
    }

    .fifi-dropdown .fifi-dropdown-content {
        display: none;
        position: absolute;
        background-color: $dropdown-content-bg-color;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
    }

    .fifi-dropdown .fifi-dropdown-content span {
        display: flex;
        align-items: center;
        a {
            color: $dropdown-option-text-color;
            padding: 12px 16px;
            text-decoration: none;
            font-size: 0.9rem;
            text-wrap: nowrap;
        }
        padding: 5px 7px;
    }

    .fifi-dropdown .fifi-dropdown-content span:hover {
        background-color: $dropdown-option-hover-color;
        cursor: pointer;
    }

    .fifi-dropdown.open .fifi-dropdown-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

</style>
