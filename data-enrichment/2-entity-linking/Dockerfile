# syntax=docker/dockerfile:1
# Keep this syntax directive! It's used to enable Docker BuildKit

# Based on https://github.com/python-poetry/poetry/discussions/1879?sort=top#discussioncomment-216865
# but I try to keep it updated (see history)


################################
# PYTHON-BASE
# Sets up all our shared environment variables
################################
FROM nvidia/cuda:11.8.0-cudnn8-runtime-ubuntu22.04 as gpu-base

# PYTHON 3.11
RUN apt-get -y update \
    && apt-get install -y software-properties-common \
    && apt-get -y update \
    &&  add-apt-repository ppa:deadsnakes/ppa \
    && apt-get -y update

RUN DEBIAN_FRONTEND=noninteractive apt-get install --yes --quiet --no-install-recommends \
    python3.11 \
    python3.11-dev \
    python3.11-distutils \
    python3.11-lib2to3 \
    python3.11-gdbm \
    python3.11-tk \
    pip

RUN update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.11 999 \
    && update-alternatives --config python3 && ln -s /usr/bin/python3 /usr/bin/python

RUN curl -sS https://bootstrap.pypa.io/get-pip.py | python3.11

FROM gpu-base as python-base

    # python
ENV PYTHONUNBUFFERED=1 \
    # prevents python creating .pyc files
    PYTHONDONTWRITEBYTECODE=1 \
    \
    # pip
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    \
    # poetry
    # https://python-poetry.org/docs/configuration/#using-environment-variables
    # https://github.com/python-poetry/poetry/releases
    POETRY_VERSION=1.7.1 \
    # make poetry install to this location
    POETRY_HOME="/opt/poetry" \
    # make poetry create the virtual environment in the project's root
    # it gets named `.venv`
    POETRY_VIRTUALENVS_IN_PROJECT=true \
    # do not ask any interactive question
    POETRY_NO_INTERACTION=1 \
    \
    # paths
    # this is where our requirements + virtual environment will live
    PYSETUP_PATH="/opt/pysetup" \
    VENV_PATH="/opt/pysetup/.venv"


# prepend poetry and venv to path
ENV PATH="$POETRY_HOME/bin:$VENV_PATH/bin:$PATH"


################################
# BUILDER-BASE
# Used to build deps + create our virtual environment
################################
FROM python-base as builder-base
RUN apt-get update \
    && apt-get install -y \
        # deps for installing poetry
        curl \
        # deps for building python deps
        build-essential

# install poetry - respects $POETRY_VERSION & $POETRY_HOME
# The --mount will mount the buildx cache directory to where 
# Poetry and Pip store their cache so that they can re-use it
RUN --mount=type=cache,target=/root/.cache \
    curl -sSL https://install.python-poetry.org | python3 -

# copy project requirement files here to ensure they will be cached.
WORKDIR $PYSETUP_PATH
COPY pyproject.toml ./
COPY lib ./lib

RUN curl -o /index_enwiki-20190420.db  https://public.ukp.informatik.tu-darmstadt.de/wikimapper/index_enwiki-20190420.db

# install runtime deps - uses $POETRY_VIRTUALENVS_IN_PROJECT internally
# Bug: --no-root (https://github.com/python-poetry/poetry/issues/1132)
RUN --mount=type=cache,target=/root/.cache \
    poetry install --no-root


################################
# PRODUCTION
# Final image used for runtime
################################
FROM python-base as production
COPY --from=builder-base $PYSETUP_PATH $PYSETUP_PATH
COPY --from=builder-base /index_enwiki-20190420.db /data/index_enwiki-20190420.db
COPY /src /src
WORKDIR /src

# set python context explicit
ENV PYTHONPATH=/
CMD ["python", "enrichment-script.py"]