import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "406xrbhm",
  dataset: "production",
  apiVersion: "2021-03-25",
  useCdn: false,
  token:
    "skZB32f02y7BwZZhBUFGv7FDQX2u0RecV7jyj1Q6Y5ic0EBsteBmMu6EpWjFUiw2HhJdRRABA8ZPmvISVIKPP3lAGJkFbiefz2oA4VCjqUpu3OprnYV3eLsyNrC53EJVC0Gj0dlN8JuZ5E21hw4utC2Q1AOrWQsbqVePmVmlfSF1tyAc6qsQ",
});
