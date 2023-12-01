Fork of https://academicpages.github.io/

## anaconda environment for local runs

Use `env.yaml` to create a conda environment with all the dependencies.

```shell
conda env create -f env.yaml
```

then activate it 
    
```shell  
conda activate ghpages
```

update the bundle

```shell
bundle update
```

and then you should be ready to go

```shell
bundle exec jekyll serve
```
You'll be able to see your site locally at http://localhost:4000.

