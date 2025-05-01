<script>

  import SpkBasicCard from "$lib/@spk/SpkBasicCard.svelte";
  import SpkDropdown from "$lib/@spk/uielements/Dropdown/SpkDropdown.svelte";
  import { activities } from "$lib/data/dashboards/crmdashboard.js";
  import { EarnedDropdown } from "$lib/data/dashboards/crmdashboard.js";

</script>
<SpkBasicCard cardProps="custom-card" headerTitle="Recent Activity" headerTitleProps="" cardBodyProps="" Headerprops="justify-content-between" >
    <div slot="customheader">
        <SpkDropdown   Color="" ToggleClass="p-0 fs-12 text-muted no-caret" Caret={false} parent={`View All<i class="ri-arrow-down-s-line align-middle ms-1 d-inline-block"></i>`} option={EarnedDropdown}/>
    </div>
    <div slot="content">
        <div>
            <ul class="list-unstyled mb-0 crm-recent-activity">
                {#each activities as activity}
                  <li class="crm-recent-activity-content">
                    <div class="d-flex align-items-top gap-1">
                      <div class="me-3">
                        <span class="avatar avatar-xs {activity.indicatorClass} avatar-rounded">
                          <i class="bi bi-circle-fill fs-8"></i>
                        </span>
                      </div>
                      <div class="crm-timeline-content">
                        <span>{activity.text} 
                          {#if activity.link}
                            <a href="#!" class={activity.linkClass}>{activity.link}</a>
                          {/if}
                          {#if activity.badge}
                            <span class="badge bg-pink-transparent">
                              {activity.badge}
                            </span>
                          {/if}
                          {#if activity.highlightedText}
                            <span class={activity.highlightedTextClass}>
                              {activity.highlightedText}
                            </span>
                          {/if}
                          {#if activity.endtext}
                              {activity.endtext}
                          {/if}
                          {#if activity.icon}
                            <span class="avatar avatar-xs {activity.iconClass} avatar-rounded">
                              <i class={activity.icon}></i>
                            </span>
                          {/if}
                        </span>
                        {#if activity.subText}
                          <span class="d-block fs-12 text-muted">{activity.subText}</span>
                        {/if}
                      </div>
                      <div class="flex-fill text-end">
                        <span class="d-block text-muted fs-11 op-7">{activity.time}</span>
                      </div>
                    </div>
                  </li>
                {/each}
              </ul>
              
        </div>
    </div>
</SpkBasicCard>