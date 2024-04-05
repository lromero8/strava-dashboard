<script lang="ts">
    import { onMount } from 'svelte';
    import Icon from '$lib/icons/+page.svelte';

    interface Treat {
        name: string;
        calories: number;
        icon: string;
    }

    export let caloriesBurned: number;

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


<div class="fifi-dropdown" class:open={isOpen}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-missing-attribute -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <a on:click={toggleDropdown}>
        <Icon name={treats[selectedTreatIndex].icon} size='22' color='white' />
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
<span>earned: {treatsEarned}</span>

<style lang="scss">
  .fifi-dropdown {
    position: relative;
  }

  .fifi-dropdown a {
    display: flex;
    align-items: center;
    color: white;
    border: none;
    cursor: pointer;

    text-decoration: underline;
    text-decoration-color: white;
    
    span {
        margin-left: 5px;
        margin-right: 5px;
    }
  }

  .fifi-dropdown .fifi-dropdown-content {
    display: none;
    position: absolute;
    background-color: white;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
  }

  .fifi-dropdown .fifi-dropdown-content span {
    display: flex;
    align-items: center;
    a {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        font-size: 0.9rem;
        text-wrap: nowrap;
    }
    padding: 5px 7px;
  }

  .fifi-dropdown .fifi-dropdown-content span:hover {
    background-color: #f1f1f1;
    cursor: pointer;
  }

  .fifi-dropdown.open .fifi-dropdown-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
