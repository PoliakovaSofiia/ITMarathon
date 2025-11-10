terraform {
  backend "s3" {
    bucket       = "terrabucket123121"
    key          = "terraform.tfstate"
    region       = "eu-central-1"
    use_lockfile = true
    encrypt      = true
  }
}
