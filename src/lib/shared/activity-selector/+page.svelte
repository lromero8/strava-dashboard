<script lang='ts'>
    import type { ActivityType } from "$lib/activity";
    import Icon from '$lib/icons/+page.svelte';
    import { createEventDispatcher } from "svelte";

    interface ActivityOption {
        activityType: ActivityType;
        icon: string;
    }

    const activityOptions: ActivityOption[] = [
        {
            activityType: 'Run',
            icon: 'Run'
        },
        {
            activityType: 'Ride',
            icon: 'Bike'
        },
        {
            activityType: 'Swim',
            icon: 'Swim'
        }
    ];
    let menuOpen = false;
    let selectedOption: ActivityOption|undefined;

    const dispatch = createEventDispatcher();

    function select(newActivity: ActivityOption) {
        selectedOption = newActivity;
        menuOpen = false;
		dispatch('selected', {
			activity: selectedOption.activityType
		});
	}

</script>

<span class="fifi-dropdown-container">
    <div class="fifi-dropdown" class:open={menuOpen}>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-missing-attribute -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <a on:click={() => menuOpen = !menuOpen} style="--selected-option-text-color: {'white'}">
            {#if selectedOption}
                <Icon name={selectedOption.icon} size='22' color={'white'} />
            {/if}
            <span>{selectedOption?.activityType || 'Select sport'}</span>
        </a>
        <div class="fifi-dropdown-content">
            {#each activityOptions as option}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <!-- svelte-ignore a11y-missing-attribute -->
                <span on:click={() => select(option)}>
                    <Icon name={option.icon} size='22' color='#0090E3' />
                    <a>{option.activityType}</a>
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
