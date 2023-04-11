from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in atlas_addon/__init__.py
from atlas_addon import __version__ as version

setup(
	name="atlas_addon",
	version=version,
	description="Atlas Addon",
	author="hidayatali",
	author_email="hidayatmanusiya1@gmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
