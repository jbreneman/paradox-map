<template>
  <button class="base-button">
    <slot></slot>
  </button>
</template>

<style scoped>
.base-button {
  display: flex;
  justify-content: center;
  border-radius: 4px;
  appearance: none;
  color: black;
  background: white;
  border: 2px solid black;
  padding: var(--spacing-100) var(--spacing-200);
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.12s ease;
  transition-property: background-color, color;

  &:hover {
    background: black;
    color: white;
  }

  &:disabled {
    cursor: not-allowed;
    background: #ebebeb;
    color: #c5c5c5;
    border-color: #ebebeb;
  }
}
</style>
