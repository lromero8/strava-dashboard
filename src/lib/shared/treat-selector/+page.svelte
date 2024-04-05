<script lang="ts">
    import { onMount } from 'svelte';
    import Icon from '$lib/icons/+page.svelte';

    interface Treat {
        name: string;
        calories: number;
        icon: string;
    }

    export let caloriesBurned: number;
    export let iconColor: string;
    export let selectedTextColor: string;
    export let selectedValueTextColor: string;

    const treats: Treat[] = [
        {
            name: 'Kölschs',
            calories: 132,
            icon: 'GlassMugVariant'
        },
        {
            name: 'Glasses of wine',
            calories: 140,
            icon: 'GlassWine'
        },
        {
            name: 'Mojitos',
            calories: 200,
            icon: 'GlassCocktail'
        },
        {
            name: 'Schwarzwäldertorte stücks',
            calories: 500,
            icon: 'CakeLayered'
        },
        {
            name: 'Döners',
            calories: 780,
            icon: 'Taco'
        }
    ];
    
    let selectedTreatIndex = 0;
    let treatsEarned = (caloriesBurned / treats[selectedTreatIndex].calories).toPrecision(2);

    let isOpen = false;

    function toggleDropdown() {
        isOpen = !isOpen;
    }

    function calculate(index: number) {
        selectedTreatIndex = index;
        treatsEarned = (caloriesBurned / treats[selectedTreatIndex].calories).toPrecision(2);
        toggleDropdown();
    }


    // Close dropdown when clicked outside
    onMount(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.fifi-dropdown')) {
                isOpen = false;
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });
</script>

<span class="fifi-dropdown-container">
    <div class="fifi-dropdown" class:open={isOpen}>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-missing-attribute -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <a on:click={toggleDropdown} style="--selected-option-text-color: {selectedTextColor}">
            <Icon name={treats[selectedTreatIndex].icon} size='22' color={iconColor} />
            <span>{treats[selectedTreatIndex].name}</span>
        </a>
        <div class="fifi-dropdown-content">
            {#each treats as treat, index}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <!-- svelte-ignore a11y-missing-attribute -->
                <span on:click={() => calculate(index)}>
                    <Icon name={treat.icon} size='22' color='#0090E3' />
                    <a>{treat.name}</a>
                </span>
            {/each}
        </div>
    </div>
    <span class="fifi-earned-text" style="--earned-text-color: {selectedTextColor}">earned: </span>
</span>

<span class="fifi-earned-value-text" style="--earned-value-text-color: {selectedValueTextColor}">{treatsEarned}</span>

<style lang="scss">

    $selected-option-text-color: var(--selected-option-text-color);
    $dropdown-content-bg-color: white;
    $dropdown-option-text-color: black;
    $dropdown-option-hover-color: #f1f1f1;
    $earned-text-color: var(--earned-text-color);
    $earned-value-text-color: var(--earned-value-text-color);

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

    .fifi-earned-text {
        color: $earned-text-color;
        margin-right: 10px;
    }

    .fifi-earned-value-text {
        color: $earned-value-text-color;
    }
</style>
