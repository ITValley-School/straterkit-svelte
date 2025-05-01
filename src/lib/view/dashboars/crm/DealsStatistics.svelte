<script>

  import SpkBasicCard from "$lib/@spk/SpkBasicCard.svelte";
  import SpkTablescomponent from "$lib/@spk/SpkTablescomponent.svelte";
  import SpkDropdown from "$lib/@spk/uielements/Dropdown/SpkDropdown.svelte";
  import PaginationStyle4 from "$lib/@spk/uielements/Pagination/PaginationStyle4.svelte";
  import { SortByDropdown, tableData } from "$lib/data/dashboards/crmdashboard.js";
  import { Input } from "@sveltestrap/sveltestrap";
  import SpkBadge from "$lib/@spk/uielements/badge/SpkBadge.svelte";
  import SpkButton from "$lib/@spk/uielements/Button/SpkButton.svelte";
</script>
<SpkBasicCard
  cardProps="custom-card"
  headerTitle=" Deals Statistics"
  headerTitleProps=""
  cardBodyProps=""
  Headerprops="justify-content-between"
>
  <div slot="customheader">
    <div class="d-flex flex-wrap gap-2">
      <div>
        <Input
          bsSize="sm"
          type="text"
          placeholder="Search Here"
          aria-label=".form-control-sm example"
        />
      </div>
      <SpkDropdown
        Size="sm"
        Color="primary"
        ToggleClass="btn-wave waves-effect waves-light no-caret opacity-100 "
        Caret={false}
        parent={`Sort By<i class="ri-arrow-down-s-line align-middle ms-1 d-inline-block"></i>`}
        option={SortByDropdown}
      />
    </div>
  </div>
  <div slot="content">
    <SpkTablescomponent
      Responsive={true}
      Bordered={true}
      Hover={true}
      showCheckbox={true}
      showCheckClass="ps-4"
      tableClass="text-nowrap border"
      header={[
        { title: "Sales Rep" },
        { title: "Category" },
        { title: "Mail" },
        { title: "Location" },
        { title: "Date" },
        { title: "Actions" },
      ]}
    >
      {#each tableData as row}
        <tr>
          <th scope="row" class="ps-4">
            <input
              class="form-check-input"
              type="checkbox"
              id={row.id}
              value=""
              aria-label="..."
              bind:checked={row.checked}
            />
          </th>
          <td>
            <div class="d-flex align-items-center fw-semibold">
              <span class="avatar avatar-sm me-2 avatar-rounded">
                <img src={row.avatar} alt="img" />
              </span>
              {row.name}
            </div>
          </td>
          <td>{row.role}</td>
          <td>{row.email}</td>
          <td>
            <SpkBadge  Color="" CustomClass={`${row.badgeClass}`} text={row.country} />
          </td>
          <td>{row.period}</td>
          <td>
            <div class="hstack gap-2 fs-15">
                <SpkButton href="#!" buttontype="button" color="success-light" size="btn-sm"  customClass="btn-icon btn-wave waves-effect waves-light" text={`<i class="ri-download-2-line"></i>`} />
                <SpkButton href="#!" buttontype="button" color="primary-light" size="btn-sm"  customClass="btn-icon btn-wave waves-effect waves-light" text={` <i class="ri-edit-line"></i>`} />
            </div>
          </td>
        </tr>
      {/each}
    </SpkTablescomponent>
  </div>
  <div slot="footer">
    <div class="d-flex align-items-center">
      <div>
        Showing 5 Entries <i class="bi bi-arrow-right ms-2 fw-semibold"></i>
      </div>
      <div class="ms-auto custom-card-pagination">
        <PaginationStyle4 />
      </div>
    </div>
  </div>
</SpkBasicCard>
